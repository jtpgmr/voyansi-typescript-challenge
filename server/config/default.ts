import dotenv from "dotenv"

dotenv.config()

export default {
  port: 4000,
  mongoUri:
    "mongodb+srv://jtpgmr:3nFWCFYFUU9TaR4J@voyansi.cdacgiu.mongodb.net/?retryWrites=true&w=majority",
  saltWorkFactor: 12,
  accessTokenTtl: "1h",
  refreshTokenTtl: "30d",
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY,
};
