import _ from "lodash"
import { FilterQuery } from "mongoose";
import config from "config"
import { ZodError } from "zod";
import log from "../../utils/logger";
import SessionModel, { GenerateSessionInput, SessionDocument } from "./sessions.model";
import { getSingleUserService } from "../users/users.services";

import { signJwt, verifyJwt } from "../../utils/jwt";

const getUserSessionService = async (query: FilterQuery<SessionDocument>) => {
  return await SessionModel.find(query).lean();
}

const generateUserSessionService = async (sessionDocumentEntry: GenerateSessionInput)  => {
  try {
    const userSession = await SessionModel.create(sessionDocumentEntry)

    // trims the response the user receives upon creating an account
    return userSession.toJSON()
  } catch (err: any) {
    throw log.error(err.message)
  }
}

const authorizeNewAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  try {
  const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");

  if (!decoded || !_.get(decoded, "session")) return false;

  const session = await SessionModel.findById(_.get(decoded, "session"));

  if (!session || !session.isValid) return false;

  const user = await getSingleUserService({ _id: session.user });

  if (!user) return false;

  const accessTokenTtl = config.get<string>("accessTokenTtl")

  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: accessTokenTtl }
  );

  return accessToken;
  } catch (err: any) {
    throw log.error(err.message)
  }
}

export { getUserSessionService, generateUserSessionService, authorizeNewAccessToken }