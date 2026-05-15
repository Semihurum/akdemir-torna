import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "admin" | "user";
  isVerified: boolean;
  verificationToken?: string;
  verificationCode?: string;
  verificationCodeExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  profileImage: string;
  acceptedTerms: boolean;
  silindi_mi: boolean; // Soft delete flag
  status: "active" | "inactive";
  is_banned: boolean;
  ban_reason?: string;
  ban_until?: Date;
  last_login_at?: Date;
  olusturulma_tarihi: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false, // In case we add OAuth later
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verificationCode: {
      type: String,
    },
    verificationCodeExpires: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    profileImage: {
      type: String,
      default: "/profiles/default-1.png",
    },
    acceptedTerms: {
      type: Boolean,
      default: false,
    },
    silindi_mi: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    is_banned: {
      type: Boolean,
      default: false,
    },
    ban_reason: {
      type: String,
    },
    ban_until: {
      type: Date,
    },
    last_login_at: {
      type: Date,
    },
    olusturulma_tarihi: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Mongoose model caching to prevent re-compilation in Next.js development
export const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
