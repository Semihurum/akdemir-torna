import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { UserRepository } from "./user.repository";

export class UserManager {
  private repository: UserRepository;
  private jwtSecret: string;
  private transporter: nodemailer.Transporter;

  constructor() {
    this.repository = new UserRepository();
    this.jwtSecret = process.env.JWT_SECRET || "default_secret_key";
    
    // Configure mailer
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });
  }

  async register(data: any) {
    const { name, email, password, profileImage, acceptedTerms, acceptedKvkk } = data;

    if (!acceptedTerms || !acceptedKvkk) {
      throw new Error("Kayıt için gerekli izinlerin onaylanması gerekmektedir.");
    }

    // Check if user exists
    const existingUser = await this.repository.findByEmail(email);
    if (existingUser) {
      throw new Error("Bu e-posta adresi zaten kullanılıyor.");
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Generate Verification Token & Code
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
    const verificationCodeExpires = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes

    // Is it the first user? Let's make them an admin for demo purposes if needed
    const userCount = await this.repository.getMany({});
    const role = userCount.length === 0 ? "admin" : "user";

    // Create user
    const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
      role,
      isVerified: false,
      verificationToken,
      verificationCode,
      verificationCodeExpires,
      profileImage: profileImage || "/profiles/default-1.png",
      acceptedTerms: true,
    });

    // Send Verification Email
    this.sendVerificationEmail(email, verificationToken, verificationCode).catch(console.error);

    return {
      success: true,
      message: "Kayıt başarılı. Lütfen e-postanızı doğrulayın.",
      userId: user._id,
    };
  }

  async login(data: any) {
    const { email, password } = data;

    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new Error("Geçersiz e-posta veya şifre.");
    }

    if (user.silindi_mi) {
      throw new Error("Hesabınız bulunamadı veya silinmiş.");
    }

    if (user.is_banned) {
      if (user.ban_until && new Date(user.ban_until) < new Date()) {
        // Ban expired, unban automatically
        user.is_banned = false;
        user.ban_reason = undefined;
        user.ban_until = undefined;
        user.status = "active";
        await user.save();
      } else {
        const reasonStr = user.ban_reason ? ` Sebep: ${user.ban_reason}` : "";
        const dateStr = user.ban_until ? ` Bitiş: ${new Date(user.ban_until).toLocaleString("tr-TR")}` : " (Kalıcı)";
        throw new Error(`Hesabınız kısıtlanmıştır.${reasonStr}${dateStr}`);
      }
    }

    if (user.status === "inactive" && !user.is_banned) {
      throw new Error("Hesabınız pasif duruma alınmış. Lütfen iletişime geçin.");
    }

    if (!user.isVerified) {
      throw new Error("Lütfen önce e-posta adresinizi doğrulayın.");
    }

    const isMatch = await bcryptjs.compare(password, user.password!);
    if (!isMatch) {
      throw new Error("Geçersiz e-posta veya şifre.");
    }

    // Update last_login_at
    user.last_login_at = new Date();
    await user.save();

    // Generate Access Token
    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, this.jwtSecret, {
      expiresIn: "1d",
    });

    return {
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    };
  }

  async verifyEmail(token: string) {
    const user = await this.repository.getOne({ verificationToken: token });
      
    if (!user) {
      throw new Error("Süresi dolmuş veya geçersiz doğrulama bağlantısı.");
    }

    if (user.isVerified) {
      return { success: true, message: "E-posta zaten doğrulanmış." };
    }

    if (user.verificationCodeExpires && user.verificationCodeExpires < new Date()) {
       throw new Error("Doğrulama bağlantısının süresi dolmuş. Lütfen yeni bir bağlantı talep edin.");
    }

    await this.repository.update({ _id: user._id }, { isVerified: true, verificationToken: "", verificationCode: "", verificationCodeExpires: null });
    return { success: true, message: "E-posta başarıyla doğrulandı." };
  }

  async verifyCode(email: string, code: string) {
    const user = await this.repository.findByEmail(email);
      
    if (!user) {
      throw new Error("Kullanıcı bulunamadı.");
    }

    if (user.isVerified) {
      return { success: true, message: "E-posta zaten doğrulanmış." };
    }

    if (user.verificationCode !== code) {
      throw new Error("Geçersiz doğrulama kodu.");
    }

    if (user.verificationCodeExpires && user.verificationCodeExpires < new Date()) {
       throw new Error("Doğrulama kodunun süresi dolmuş. Lütfen yeni bir kod talep edin.");
    }

    await this.repository.update({ _id: user._id }, { isVerified: true, verificationToken: "", verificationCode: "", verificationCodeExpires: null });
    return { success: true, message: "E-posta başarıyla doğrulandı." };
  }

  async resendVerificationCode(email: string) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı.");
    }

    if (user.isVerified) {
      throw new Error("Hesap zaten doğrulanmış.");
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpires = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes

    await this.repository.update({ _id: user._id }, {
      verificationToken,
      verificationCode,
      verificationCodeExpires
    });

    this.sendVerificationEmail(email, verificationToken, verificationCode).catch(console.error);

    return { success: true, message: "Doğrulama kodu tekrar gönderildi." };
  }

  async forgotPassword(email: string) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new Error("Bu e-posta adresine ait bir kullanıcı bulunamadı.");
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    await this.repository.update({ _id: user._id }, { resetPasswordToken: resetToken, resetPasswordExpires });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"Akdemirler Tornacılık" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Şifre Sıfırlama Talebi",
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">Şifre Sıfırlama</h2>
          <p style="color: #555; font-size: 16px;">Hesabınız için şifre sıfırlama talebinde bulundunuz. Yeni şifrenizi belirlemek için aşağıdaki butona tıklayın:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #f97316; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Şifremi Sıfırla</a>
          </div>
          <p style="color: #888; font-size: 12px;">Bu bağlantı 1 saat boyunca geçerlidir. Bu talebi siz yapmadıysanız lütfen bu e-postayı dikkate almayın.</p>
        </div>
      `,
    };

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await this.transporter.sendMail(mailOptions);
    }
    
    return { success: true };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.repository.getOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date() } });
    
    if (!user) {
      throw new Error("Geçersiz veya süresi dolmuş şifre sıfırlama bağlantısı.");
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    await this.repository.update({ _id: user._id }, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    });

    return { success: true, message: "Şifreniz başarıyla güncellendi." };
  }

  async getAllUsers() {
    return this.repository.getMany({});
  }

  private async sendVerificationEmail(email: string, token: string, code: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const verifyUrl = `${baseUrl}/api/auth/verify?token=${token}`;

    const mailOptions = {
      from: `"Akdemirler Tornacılık" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Akdemirler Tornacılık - E-posta Doğrulama",
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">Akdemirler Tornacılık'a Hoş Geldiniz!</h2>
          <p style="color: #555; font-size: 16px;">Sayın kullanıcımız,</p>
          <p style="color: #555; font-size: 16px;">Hesabınızı başarıyla oluşturduk. Lütfen e-posta adresinizi doğrulamak için aşağıdaki butona tıklayın veya doğrulama kodunu girin:</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="color: #555; font-size: 14px; margin-bottom: 10px;">Doğrulama Kodunuz:</p>
            <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #f97316;">${code}</span>
            <p style="color: #888; font-size: 12px; margin-top: 10px;">(Bu kod 3 dakika geçerlidir)</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${verifyUrl}" style="background-color: #2563eb; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">E-postamı Doğrula (Bağlantı)</a>
          </div>
          <p style="color: #555; font-size: 14px;">Eğer butona tıklayamıyorsanız, aşağıdaki bağlantıyı tarayıcınıza kopyalayabilirsiniz:</p>
          <p style="word-break: break-all; color: #888; font-size: 13px;">${verifyUrl}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #999; font-size: 12px; text-align: center;">Bu e-posta otomatik olarak gönderilmiştir. Lütfen yanıtlamayınız.</p>
        </div>
      `,
    };

    // Note: This will fail silently if EMAIL_USER/PASS is not set in .env.local
    // In a real app we'd handle the error, but we catch it in the register method above.
    if(process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await this.transporter.sendMail(mailOptions);
    } else {
      console.warn("E-posta gönderimi atlandı. .env.local dosyasında e-posta ayarları eksik. Token:", token);
    }
  }
}
