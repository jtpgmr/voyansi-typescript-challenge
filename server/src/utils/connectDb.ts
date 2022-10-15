import mongoose from "mongoose";
import config from "config";
import dotenv from "dotenv";

import log from "./logger";

dotenv.config();
const mongoUri = config.get<string>("mongoUri");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(mongoUri);

    log.info(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    log.error(
      "MongoServerError: bad auth : Authentication failed -- MongoURI may be invalid"
    );
    process.exit(1);
  }
};

export default connectDb;
