/**
 * Contact Repository — sadece veritabanı işlemleri.
 * HTTP bilgisi, iş mantığı veya response formatlama içermez.
 */

import { BaseRepository } from "@/base/base.repository";
import ContactModel, { IContact } from "./contact.model";

class ContactRepository extends BaseRepository<IContact> {
  constructor() {
    super(ContactModel);
  }

  // Contact'a özel sorgu eklemek gerekirse buraya yazılır.
  // Örn: e-posta ile arama
  async findByEmail(email: string): Promise<IContact | null> {
    return this.getOne({ email });
  }
}

// Singleton instance
export const contactRepository = new ContactRepository();
