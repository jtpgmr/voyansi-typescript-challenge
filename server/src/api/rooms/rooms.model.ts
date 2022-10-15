import { Document, Schema, model } from "mongoose";
import { UserDocument } from "../users/users.model";

export interface UpdateRoomInput {
  name: string
}

export interface CreateRoomInput {
  name: string;
  number: number;
}

export interface RoomDocument extends CreateRoomInput, Document {
  // for timestamps
  createdAt: Date;
  updatedAt: Date;
  occupant: UserDocument["_id"];
}

const roomSchema = new Schema(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
    occupant: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
  },
  {
    timestamps: true,
  }
);

const RoomModel = model<RoomDocument>("Room", roomSchema);

export default RoomModel;