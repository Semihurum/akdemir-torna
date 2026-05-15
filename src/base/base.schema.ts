/**
 * Base Schema — tüm Mongoose modellerinde ortak olan alanlar.
 * Her feature modeli bu alanları spread ederek kullanır.
 */

import { Schema } from "mongoose";

export const baseSchemaFields = {
  aktif_mi: {
    type: Boolean,
    default: true,
  },
  silindi_mi: {
    type: Boolean,
    default: false,
  },
  olusturulma_tarihi: {
    type: Date,
    default: Date.now,
  },
  degistirilme_tarihi: {
    type: Date,
    default: Date.now,
  },
} as const;

/**
 * Pre-save hook: degistirilme_tarihi'ni günceller.
 * Her schema'ya uygulanmalı.
 */
export function applyBaseHooks(schema: Schema): void {
  schema.pre("save", async function () {
    this.set("degistirilme_tarihi", new Date());
  });

  schema.pre("findOneAndUpdate", async function () {
    this.set({ degistirilme_tarihi: new Date() });
  });
}
