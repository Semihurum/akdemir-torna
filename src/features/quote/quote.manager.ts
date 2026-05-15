import { BaseManager } from "@/base/base.manager";
import { QuoteRepository } from "./quote.repository";
import { IQuote } from "./quote.model";

export class QuoteManager extends BaseManager<IQuote> {
  constructor() {
    super(new QuoteRepository());
  }

  // Özel iş kuralları
  async create(data: Partial<IQuote>): Promise<IQuote> {
    const quote = await super.create(data);
    
    // Create notification
    const { AdminNotificationModel } = await import("@/features/admin/notification.model");
    
    const sourceText = data.source === "contact_form" ? "Mesaj Gönderin Formu" : "Teklif Al Formu";
    const serviceText = data.serviceType ? `${data.serviceType} hizmeti için ` : "";
    
    await AdminNotificationModel.create({
      type: "new_quote",
      source: data.source || "quote_form",
      title: "Yeni teklif talebi",
      message: `${quote.fullName} tarafından ${serviceText}yeni teklif talebi gönderildi. (${sourceText})`,
      related_quote_id: quote._id,
    });

    return quote;
  }
}
