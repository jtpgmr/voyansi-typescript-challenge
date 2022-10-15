import { Request, Response } from 'express';
import config from "config"

import { signJwt } from '../../utils/jwt';
import { validateUserPasswordService } from '../users/users.services';
import { getUserSessionService, generateUserSessionService } from './sessions.services';
import log from '../../utils/logger';

const getUserSessionController = async (req: Request, res: Response) => { 
  const userId = res.locals.user;

  const sessions = await getUserSessionService({ user: userId, valid: true });

  return res.send(sessions);
}

const generateUserSessionController = async (req: Request, res: Response) => {
  // validate user password input
  const user = await validateUserPasswordService(req.body);

  // if no existing user is found, a 401 error is thrown
  if (!user) {
    return res.status(401).send("Invalid username or password.")
  }

  // create session
  const session = await generateUserSessionService(user._id)

  // generate access token (jwt)
  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: config.get("accessTokenTtl") }
  );

  // generate a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    "refreshTokenPrivateKey",
    { expiresIn: config.get("refreshTokenTtl") } 
  );

  // return tokens to user
  return res.send({ accessToken, refreshToken })
}

export { getUserSessionController, generateUserSessionController }