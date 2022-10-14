import _ from "lodash";
import log from "../../utils/logger";
import UserModel, { RegisterUserInput, UserDocument } from "./users.model";

const registerUserService = async (userDocumentEntry: RegisterUserInput) => {
  try {
    const newUser = await UserModel.create(userDocumentEntry);

    // trims the response the user receives upon creating an account
    return _.omit(newUser.toJSON(), ["password", "__v"]);
  } catch (err: any) {
    throw log.error(err.message);
  }
};

// finds user via their email, and checks if the inserted password
// matches the decrypted password
const validateUserPasswordService = async ({
  email,
  password
}: {
  email: UserDocument["email"],
  password: UserDocument["password"]
}) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return false;
    }

    const correctPassword = await user.comparePassword(password);

    if (!correctPassword) {
      return false;
    }

    return _.omit(user.toJSON(), "password");
  } catch (err: any) {
    throw log.error(err.message);
  }
};

export { registerUserService, validateUserPasswordService };
