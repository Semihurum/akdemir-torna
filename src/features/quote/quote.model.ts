import mongoose, { Schema, Document, Model } from "mongoose";
import { baseSchemaFields, applyBaseHooks } from "@/base/base.schema";

export interface IQuote extends Document {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  serviceType?: string;
  user_id?: mongoose.Types.ObjectId;
  projectDescription: string;
  files?: any[];
  status: "Yeni" | "İnceleniyor" | "Cevaplandı" | "Reddedildi" | "Tamamlandı";
  isRead: boolean;
  adminNote?: string;
  public_admin_message?: string;
  source: "contact_form" | "quote_form";
  aktif_mi: boolean;
  silindi_mi: boolean;
  olusturulma_tarihi: Date;
  degistirilme_tarihi: Date;
}

const QuoteSchema = new Schema<IQuote>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  fullName: {
    type: String,
    required: [true, "Ad Soyad alanı zorunludur."],
    trim: true,
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
  companyName: {
    type: String,
    trim: true,
  },
  projectDescription: {
    type: String,
    required: [true, "Proje açıklaması zorunludur."],
    trim: true,
  },
  serviceType: {
    type: String,
    trim: true,
  },
  files: {
    type: [Schema.Types.Mixed],
    default: [],
  },
  status: {
    type: String,
    enum: ["Yeni", "İnceleniyor", "Cevaplandı", "Reddedildi", "Tamamlandı"],
    default: "Yeni",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  adminNote: {
    type: String,
  },
  public_admin_message: {
    type: String,
  },
  source: {
    type: String,
    enum: ["contact_form", "quote_form"],
    default: "quote_form",
  },
  ...baseSchemaFields,
});

applyBaseHooks(QuoteSchema);

if (mongoose.models.Quote) {
  mongoose.deleteModel("Quote");
}

export const QuoteModel: Model<IQuote> = mongoose.model<IQuote>("Quote", QuoteSchema);
