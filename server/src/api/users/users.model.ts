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
  rooms: [Schema.Types.ObjectId];
  // rooms: [RoomDocument["_id"]]
  comparePassword(loginAttemptPassword: string): Promise<Boolean>;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: "Room"
    }]
  },
  {
    timestamps: true,
  }
);

// Password Hash Function
userSchema.pre("save", async function (next) {
  let newUser = this as UserDocument;

  if (!newUser.isModified("password")) {
    return next();
  }

  const saltWorkFactor: string = config.get<string>("saltWorkFactor")

  const salt = await bcrypt.genSalt(parseInt(saltWorkFactor));
  const hash = await bcrypt.hashSync(newUser.password, salt);

  newUser.password = hash;

  return next();
});

// USER LOGIN FUNCTION
userSchema.methods.comparePassword = async function (
  loginAttemptPassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return await bcrypt.compare(loginAttemptPassword, user.password).catch((err) => false);
};

// applying UserDocument type allows model to use fields and methods
// from the userSchema
const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;
