/**
 * Contact Manager — iş mantığı katmanı.
 * DTO validation'dan geçmiş veriyi alır, repository'ye iletir,
 * mapper ile güvenli response döndürür.
 * NextResponse veya HTTP bilgisi burada YOKTUR.
 */

import { BaseManager } from "@/base/base.manager";
import { IContact } from "./contact.model";
import { contactRepository } from "./contact.repository";
import { ContactCreateInput } from "./contact.dto";
import { toContactResponse, toContactResponseList } from "./contact.mapper";
import { ContactResponseDto } from "@/types";

class ContactManager extends BaseManager<IContact> {
  constructor() {
    super(contactRepository);
  }

  /** Yeni iletişim formu kaydı oluştur */
  async createContact(input: ContactCreateInput): Promise<ContactResponseDto> {
    const doc = await this.repository.create(input as Partial<IContact>);
    return toContactResponse(doc);
  }

  /** Tüm iletişim kayıtlarını getir */
  async getAllContacts(): Promise<ContactResponseDto[]> {
    const docs = await this.repository.getMany();
    return toContactResponseList(docs);
  }

  /** Tek bir iletişim kaydını ID ile getir */
  async getContactById(id: string): Promise<ContactResponseDto | null> {
    const doc = await this.repository.getOne({ _id: id });
    return doc ? toContactResponse(doc) : null;
  }

  /** Soft delete */
  async deleteContact(id: string): Promise<boolean> {
    const result = await this.repository.softDelete({ _id: id });
    return result !== null;
  }
}

// Singleton instance
export const contactManager = new ContactManager();
