import { Request, Response } from "express";
import { IdParam } from "../../interfaces/IdParam";
import RoomModel, {
  RoomDocument,
  CreateRoomInput,
  UpdateRoomInput,
} from "./rooms.model";
import { createRoomService, getAllRoomsService } from "./rooms.services";
import log from "../../utils/logger";
import { ZodError } from "zod";
import UserModel from "../users/users.model";

const getAllRoomsController = async (req: Request, res: Response) => {
  const rooms = await getAllRoomsService();
  return res.send(rooms);
};

const getSingleRoomController = async (
  req: Request<IdParam, RoomDocument, {}>,
  res: Response<RoomDocument>
) => {
  try {
    const room = await RoomModel.findById(req.params._id);
    // log.info(req)

    if (!room) {
      throw new Error("Error finding room.");
    }

    return res.status(200).json(room);
  } catch (err: any) {
    if (err instanceof ZodError) {
      log.error(err.issues);
      return res.status(422);
    }

    return res.status(409).send(err);
  }
};

const createRoomController = async (
  req: Request<{}, {}, CreateRoomInput>,
  res: Response
) => {
  try {
    const insertResult = await RoomModel.create(req.body);

    if (!insertResult) {
      // throws a 500 (server-side) Error, not 400 (client-side) Error
      throw new Error("Error inserting room.");
    }
    res.status(201).json(insertResult);
  } catch (err: any) {
    if (err instanceof ZodError) {
      log.error(err.issues);
      return res.status(422);
    }

    return res.status(409).send(err);
  }
};

const updateRoomOccupantController = async (
  req: Request<IdParam, {}, UpdateRoomInput>,
  res: Response
) => {
  try {
    // check details on the user
    const user = await UserModel.findById(req.body.occupant);

    // check if room is occupied
    const checkRoomOccupant = await RoomModel.findById(req.params._id);
    log.info("user\n" + user?.id);
    log.info("checkRoomOccupant\n" + checkRoomOccupant?.occupant);

    if (user?.id == checkRoomOccupant?.occupant) {
      req.body.occupant = null
      const clearRoomOccupant = await RoomModel.findByIdAndUpdate(
        {
          _id: req.params._id,
        },
        {
          $set: req.body,
        },
        {
          returnDocument: "after",
        }
      );

      log.info(clearRoomOccupant);
      return res.status(201).json(clearRoomOccupant);
    }

    if (checkRoomOccupant?.occupant && checkRoomOccupant?.occupant !== null) {
      return res.status(409).send("Occupant already exists");
    }

    const updateRoomOccupant = await RoomModel.findByIdAndUpdate(
      {
        _id: req.params._id,
      },
      {
        $set: req.body,
      },
      {
        returnDocument: "after",
      }
    );

    if (!updateRoomOccupant) {
      throw new Error("Error updating room occupant.");
    }

    // log.info(updateRoomOccupant);
    res.status(201).json(updateRoomOccupant);
  } catch (err: any) {
    if (err instanceof ZodError) {
      log.error(err.issues);
      return res.status(422);
    }

    return res.status(409).send(err);
  }
};

const deleteRoomController = async (
  req: Request<IdParam, {}, {}>,
  res: Response
) => {
  try {
    const room = await RoomModel.findByIdAndDelete(req.params._id);

    if (!room) {
      throw new Error("Error finding room.");
    }

    return res.status(200).send("Room deleted");
  } catch (err: any) {
    if (err instanceof ZodError) {
      log.error(err.issues);
      return res.status(422);
    }

    return res.status(409).send(err);
  }
};

export {
  getAllRoomsController,
  getSingleRoomController,
  createRoomController,
  updateRoomOccupantController,
  deleteRoomController,
};
