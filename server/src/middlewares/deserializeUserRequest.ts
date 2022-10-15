import { NextFunction, Request, Response } from 'express';
import _ from "lodash";
import { verifyJwt } from "../utils/jwt";
import { authorizeNewAccessToken } from "../api/sessions/sessions.services";
import log from '../utils/logger';

const deserializeUserRequest = async (req: Request, res: Response, next: NextFunction) => {
  // safer method of retrieving the 'auth' property
  // replace in this context performs the same outcome of split("")[0]
  const accessToken = _.get(req, "headers.authorization", "").replace(
    "Bearer",
    ""
  );

  const refreshToken = _.get(req, "headers.x-refresh");

  if (!accessToken) {
    return next();
  }

  const { expired, decoded } = verifyJwt(accessToken, "accessTokenPublicKey");

  // getUserSessionController
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await authorizeNewAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string, "accessTokenPublicKey");

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUserRequest;