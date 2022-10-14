import express from "express"

import validateRequest from "../../middlewares/validateRequest";
import { sessionSchema } from "../../schemas/session.schema";
import { generateUserSessionController } from "./sessions.controllers";

const sessionRoutes = express.Router();

sessionRoutes.post(
  "/",
  validateRequest(sessionSchema),
  generateUserSessionController
);

export default sessionRoutes;