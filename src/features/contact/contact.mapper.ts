/**
 * Contact Mapper — DB modelini güvenli response objesine dönüştürür.
 * Model doğrudan frontend'e dönmez, mapper üzerinden geçer.
 */

import { IContact } from "./contact.model";
import { ContactResponseDto } from "@/types";

/** Tek bir Contact kaydını response DTO'ya çevir */
export function toContactResponse(doc: IContact): ContactResponseDto {
  return {
    id: doc._id.toString(),
    fullName: doc.fullName,
    email: doc.email,
    phone: doc.phone,
    serviceType: doc.serviceType,
    message: doc.message,
    olusturulma_tarihi: doc.olusturulma_tarihi,
  };
}

/** Birden fazla Contact kaydını response DTO listesine çevir */
export function toContactResponseList(
  docs: IContact[]
): ContactResponseDto[] {
  return docs.map(toContactResponse);
}
