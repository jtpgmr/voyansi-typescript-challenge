import { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

// combines the fields above with _id from Doc (along with generics)
// then applies createdAt and updatedAt fields
export interface UserDocument extends RegisterUserInput, Document {
  // for timestamps
  createdAt: Date;
  updatedAt: Date;
  roomIds: [Schema.Types.ObjectId];
  comparePassword(loginAttemptPassword: string): Promise<Boolean>;
}

const roomSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roomIds: [{
        type: Schema.Types.ObjectId,
        ref: "Room"
    }]
  },
  {
    timestamps: true,
  }
);

const UserModel = model<UserDocument>("Room", roomSchema);

export default UserModel;