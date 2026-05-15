import { BaseRepository } from "@/base/base.repository";
import { UserModel, IUser } from "./user.model";

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }

  // Özel User query'leri buraya gelebilir
  async findByEmail(email: string): Promise<IUser | null> {
    return this.getOne({ email });
  }

  async verifyUser(userId: string): Promise<IUser | null> {
    return this.update({ _id: userId }, { isVerified: true, verificationToken: "" });
  }
}
