import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContent extends Document {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  phone: string;
  email: string;
  address: string;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>({
  heroTitle: { type: String, default: "Akdemirler Tornacılık" },
  heroSubtitle: { type: String, default: "Hassas Mühendislik & Torna" },
  heroDescription: { type: String, default: "Çeyrek asırlık tecrübemizle metal işleme ve hassas üretim çözümleri sunuyoruz." },
  aboutTitle: { type: String, default: "Hakkımızda" },
  aboutDescription: { type: String, default: "Akdemirler Tornacılık olarak yılların tecrübesiyle..." },
  phone: { type: String, default: "+90 555 123 4567" },
  email: { type: String, default: "info@akdemirlertorna.com" },
  address: { type: String, default: "İstanbul, Türkiye" },
}, { timestamps: true });

export const ContentModel: Model<IContent> =
  mongoose.models.Content || mongoose.model<IContent>("Content", ContentSchema);
