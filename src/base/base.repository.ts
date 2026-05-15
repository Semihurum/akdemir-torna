/**
 * Base Repository — tüm feature repository'lerin miras aldığı ortak CRUD.
 * Model bağımsız, generic bir yapıdadır.
 */

import mongoose, { Model, Document } from "mongoose";
import { dbConnect } from "@/core/db/mongodb";

export class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  /** Yeni kayıt oluştur */
  async create(data: Partial<T>): Promise<T> {
    await dbConnect();
    return this.model.create(data) as Promise<T>;
  }

  /** Tek kayıt getir (silinmemiş) */
  async getOne(filter: Record<string, any>): Promise<T | null> {
    await dbConnect();
    return this.model.findOne({ ...filter, silindi_mi: false }).exec();
  }

  /** Çoklu kayıt getir (silinmemiş) */
  async getMany(filter: Record<string, any> = {}): Promise<T[]> {
    await dbConnect();
    return this.model
      .find({ ...filter, silindi_mi: false })
      .sort({ olusturulma_tarihi: -1 })
      .exec();
  }

  /** Güncelle */
  async update(
    filter: Record<string, any>,
    data: Record<string, any>
  ): Promise<T | null> {
    await dbConnect();
    return this.model
      .findOneAndUpdate(filter, data, { new: true, runValidators: true })
      .exec();
  }

  /** Soft delete — silindi_mi = true */
  async softDelete(filter: Record<string, any>): Promise<T | null> {
    await dbConnect();
    return this.model
      .findOneAndUpdate(filter, { silindi_mi: true } as any, {
        new: true,
      })
      .exec();
  }

  /** Hard delete — veritabanından kalıcı silme */
  async hardDelete(filter: Record<string, any>): Promise<boolean> {
    await dbConnect();
    const result = await this.model.deleteOne(filter).exec();
    return result.deletedCount > 0;
  }
}
