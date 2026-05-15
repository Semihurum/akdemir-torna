/**
 * Base Manager — tüm feature manager'ların miras aldığı ortak iş mantığı.
 * Repository üzerinden çalışır, HTTP bilgisi içermez.
 */

import mongoose, { Document } from "mongoose";
import { BaseRepository } from "./base.repository";

export class BaseManager<T extends Document> {
  constructor(protected readonly repository: BaseRepository<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.repository.create(data);
  }

  async getOne(filter: Record<string, any>): Promise<T | null> {
    return this.repository.getOne(filter);
  }

  async getMany(filter: Record<string, any> = {}): Promise<T[]> {
    return this.repository.getMany(filter);
  }

  async softDelete(filter: Record<string, any>): Promise<T | null> {
    return this.repository.softDelete(filter);
  }

  async hardDelete(filter: Record<string, any>): Promise<boolean> {
    return this.repository.hardDelete(filter);
  }
}
