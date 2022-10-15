import express from "express"

import validateRequest from "../../middlewares/validateRequest";
import sessionSchema from "./sessions.schema";
import * as SessionControllers from './sessions.controllers';

const sessionRoutes = express.Router();

sessionRoutes.get(
  "/",
  validateRequest({ body: sessionSchema }),
  SessionControllers.getUserSessionController
);


sessionRoutes.post(
  "/",
  validateRequest({ body: sessionSchema }),
  SessionControllers.generateUserSessionController
);

export default sessionRoutes;