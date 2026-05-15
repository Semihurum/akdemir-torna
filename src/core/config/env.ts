/**
 * Ortam değişkenleri yönetimi.
 * Tüm env erişimi bu dosya üzerinden yapılır.
 */

function getEnvVar(key: string, required = true): string {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(
      `[ENV] "${key}" ortam değişkeni tanımlanmamış. .env.local dosyasını kontrol edin.`
    );
  }
  return value || "";
}

export const env = {
  MONGODB_URI: () => getEnvVar("MONGODB_URI"),
  WHATSAPP_PHONE: () => process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "",
} as const;
