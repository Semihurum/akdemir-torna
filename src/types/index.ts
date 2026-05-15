/**
 * Proje genelinde kullanılan ortak tip tanımları.
 */

/** API response standart yapısı */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

/** Base schema'dan gelen ortak alanlar */
export interface BaseFields {
  aktif_mi: boolean;
  silindi_mi: boolean;
  olusturulma_tarihi: Date;
  degistirilme_tarihi: Date;
}

/** Contact response DTO tipi (frontend'e dönen) */
export interface ContactResponseDto {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  olusturulma_tarihi: Date;
}
