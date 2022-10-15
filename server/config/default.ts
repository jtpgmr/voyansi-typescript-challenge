import dotenv from "dotenv"

dotenv.config()

export default {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  saltWorkFactor: process.env.ENCRYPTION_SALT,
  accessTokenTtl: process.env.ACCESS_TOKEN_TIME_TO_LIVE,
  refreshTokenTtl: process.env.REFRESH_TOKEN_TIME_TO_LIVE,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY,
};
