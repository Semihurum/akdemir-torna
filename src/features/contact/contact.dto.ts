/**
 * Contact DTO — Zod ile request validation.
 * Route katmanında gelen veriyi doğrulamak için kullanılır.
 */

import { z } from "zod";

/** İletişim formu oluşturma DTO'su */
export const ContactCreateDto = z.object({
  fullName: z
    .string({ message: "Ad Soyad alanı zorunludur." })
    .min(2, "Ad Soyad en az 2 karakter olmalıdır.")
    .max(100, "Ad Soyad en fazla 100 karakter olabilir.")
    .trim(),

  email: z
    .string({ message: "E-posta alanı zorunludur." })
    .email("Geçerli bir e-posta adresi giriniz.")
    .trim()
    .toLowerCase(),

  phone: z
    .string({ message: "Telefon alanı zorunludur." })
    .min(7, "Geçerli bir telefon numarası giriniz.")
    .trim(),

  serviceType: z
    .enum(
      [
        "Torna İşleri",
        "Kalıp ve Parça İşleme",
        "Hassas Ölçüm",
        "Özel Üretim",
        "Diğer",
      ],
      { message: "Geçerli bir hizmet türü seçiniz." }
    )
    .optional()
    .default("Diğer"),

  message: z
    .string({ message: "Mesaj alanı zorunludur." })
    .min(10, "Mesaj en az 10 karakter olmalıdır.")
    .max(2000, "Mesaj en fazla 2000 karakter olabilir.")
    .trim(),
});

/** DTO'dan çıkan tip */
export type ContactCreateInput = z.infer<typeof ContactCreateDto>;
