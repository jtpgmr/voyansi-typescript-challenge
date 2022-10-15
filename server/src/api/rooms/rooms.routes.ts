import express, { Express, Router } from "express"
import * as RoomControllers from './rooms.controllers';
import { validateRequest } from "../../middlewares";
import roomSchema, { updateRoomOccupantSchema } from "./rooms.schema";
import { IdParam } from "../../interfaces/IdParam";

const roomRoutes = express.Router();

roomRoutes.get('/', validateRequest({}), RoomControllers.getAllRoomsController);

roomRoutes.get('/:_id', validateRequest({params: IdParam}), RoomControllers.getSingleRoomController);

roomRoutes.post('/', validateRequest({body: roomSchema}), RoomControllers.createRoomController);

roomRoutes.put("/:_id", validateRequest({params: IdParam, body: updateRoomOccupantSchema }), RoomControllers.updateRoomOccupantController)

roomRoutes.delete("/:_id", validateRequest({params: IdParam }), RoomControllers.deleteRoomController)

export default roomRoutes;