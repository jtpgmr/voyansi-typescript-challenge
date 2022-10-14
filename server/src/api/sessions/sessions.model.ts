import { Document, Schema, model } from "mongoose";
import { UserDocument } from "../users/users.model";

export interface GenerateSessionInput {
  user: UserDocument["_id"];
}

export interface SessionDocument extends GenerateSessionInput, Document {
  // for timestamps
  isValid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema(
  {
    isValid: { type: String, default: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

const SessionModel = model<SessionDocument>("Session", sessionSchema);

export default SessionModel;