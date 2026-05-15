import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdminNotification extends Document {
  type: string;
  source?: string;
  title: string;
  message: string;
  related_quote_id?: mongoose.Types.ObjectId;
  is_read: boolean;
  archived_at?: Date;
  deleted_at?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminNotificationSchema = new Schema<IAdminNotification>(
  {
    type: {
      type: String,
      required: true,
      default: "system", // e.g., "new_quote", "system"
    },
    source: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    related_quote_id: {
      type: Schema.Types.ObjectId,
      ref: "Quote",
    },
    is_read: {
      type: Boolean,
      default: false,
    },
    archived_at: {
      type: Date,
    },
    deleted_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const AdminNotificationModel: Model<IAdminNotification> =
  mongoose.models.AdminNotification || mongoose.model<IAdminNotification>("AdminNotification", AdminNotificationSchema);
