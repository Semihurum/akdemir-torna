import { BaseRepository } from "@/base/base.repository";
import { QuoteModel, IQuote } from "./quote.model";

export class QuoteRepository extends BaseRepository<IQuote> {
  constructor() {
    super(QuoteModel);
  }

  // Özel metodlar gerekirse eklenecek
}
