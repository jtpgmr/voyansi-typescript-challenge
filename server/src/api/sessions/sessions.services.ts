import _ from "lodash"
import log from "../../utils/logger";
import SessionModel, { GenerateSessionInput } from "./sessions.model";

export const generateUserSessionService = async (sessionDocumentEntry: GenerateSessionInput)  => {
  try {
    const userSession = await SessionModel.create(sessionDocumentEntry)

    // trims the response the user receives upon creating an account
    return userSession.toJSON()
  } catch (err: any) {
    throw log.error(err.message)
  }
}