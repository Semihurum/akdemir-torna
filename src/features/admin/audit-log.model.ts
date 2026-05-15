import mongoose, { Schema, Document } from "mongoose";

export interface IAdminAuditLog extends Document {
  adminId: mongoose.Types.ObjectId;
  adminName: string;
  action: string;
  targetId?: mongoose.Types.ObjectId | string;
  targetType?: "User" | "Message" | "Quote" | "CMS" | "System";
  details?: string;
  ipAddress?: string;
  createdAt: Date;
}

const AdminAuditLogSchema = new Schema(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminName: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
      // e.g. "BAN_USER", "UNBAN_USER", "CHANGE_ROLE", "DELETE_USER", "LOGIN"
    },
    targetId: {
      type: Schema.Types.Mixed,
    },
    targetType: {
      type: String,
      enum: ["User", "Message", "Quote", "CMS", "System"],
    },
    details: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

export const AdminAuditLogModel = mongoose.models.AdminAuditLog || mongoose.model<IAdminAuditLog>("AdminAuditLog", AdminAuditLogSchema);
