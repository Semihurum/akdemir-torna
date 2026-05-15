/**
 * Contact Model — Mongoose schema ve model tanımı.
 * Base schema alanlarını miras alır.
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { baseSchemaFields, applyBaseHooks } from "@/base/base.schema";

export interface IContact extends Document {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  isRead: boolean;
  aktif_mi: boolean;
  silindi_mi: boolean;
  olusturulma_tarihi: Date;
  degistirilme_tarihi: Date;
}

const ContactSchema = new Schema<IContact>({
  fullName: {
    type: String,
    required: [true, "Ad Soyad alanı zorunludur."],
    trim: true,
    maxlength: [100, "Ad Soyad en fazla 100 karakter olabilir."],
  },
  email: {
    type: String,
    required: [true, "E-posta alanı zorunludur."],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Telefon alanı zorunludur."],
    trim: true,
  },
  serviceType: {
    type: String,
    default: "Diğer",
    enum: [
      "Torna İşleri",
      "Kalıp ve Parça İşleme",
      "Hassas Ölçüm",
      "Özel Üretim",
      "Diğer",
    ],
  },
  message: {
    type: String,
    required: [true, "Mesaj alanı zorunludur."],
    trim: true,
    maxlength: [2000, "Mesaj en fazla 2000 karakter olabilir."],
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  // Base schema alanları
  ...baseSchemaFields,
});

// Base hook'ları uygula (degistirilme_tarihi otomatik güncelleme)
applyBaseHooks(ContactSchema);

const ContactModel: Model<IContact> =
  mongoose.models.Contact ||
  mongoose.model<IContact>("Contact", ContactSchema);

export default ContactModel;
