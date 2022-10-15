import jwt from "jsonwebtoken";
import config from "config";
import log from "./logger";

const signJwt = (
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) => {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");

  return jwt.sign(object, signingKey, {
    ...(options && options),
    // setting RS256 causes pem error
    // algorithm: "RS256",
  });
}

const verifyJwt = (
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) => {
  const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii"
  );
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      isValid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    log.error(err)
    return {
      isValid: false,
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
}

export { signJwt, verifyJwt }