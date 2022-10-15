import { Request, Response } from 'express';
import { IdParam } from '../../interfaces/IdParam';
import RoomModel, { RoomDocument, CreateRoomInput, UpdateRoomInput } from './rooms.model';
import { createRoomService, getAllRoomsService } from './rooms.services';
import log from '../../utils/logger';
import { ZodError } from 'zod';

const getAllRoomsController = async (req: Request, res: Response) => {
  const rooms = await getAllRoomsService()
  return res.send(rooms)
}

const getSingleRoomController = async (req: Request<IdParam, RoomDocument, {}>, res: Response<RoomDocument>) => {
  try {
  const room = await RoomModel.findById(req.params._id)
  // log.info(req)

  if (!room) {
    throw new Error('Error finding room.');
  }

  return res.status(200).json(room);
  } catch (err: any) {
    if (err instanceof ZodError) {
      log.error(err.issues)
      return res.status(422);
    }

    return res.status(409).send(err)
  }
}

const createRoomController = async (req: Request<{}, {}, CreateRoomInput>, res: Response) => {
  try {
    const insertResult = await RoomModel.create(req.body);

    if (!insertResult) {
      // throws a 500 (server-side) Error, not 400 (client-side) Error
      throw new Error('Error inserting room.');
    }
    res.status(201).json(insertResult);
  } catch (err: any) {
    if (err instanceof ZodError) {
      log.error(err.issues)
      return res.status(422);
    }

    return res.status(409).send(err)
};
};

const updateRoomOccupantController = async (req: Request<IdParam, RoomDocument, UpdateRoomInput>, res: Response<RoomDocument>) => {
  try {
    const updateRoomOccupant = await RoomModel.findByIdAndUpdate({
      _id: req.params._id
    }, {
      $set: req.body
    }, {
      // returns Todo after find and set are complete (once its been updated)
      returnDocument: 'after',
    })
    

    if (!updateRoomOccupant) {
      // throws a 500 (server-side) Error, not 400 (client-side) Error
      throw new Error('Error inserting room.');
    }
    log.info(updateRoomOccupant)
    res.status(201).json(updateRoomOccupant);
  } catch (err: any) {
    if (err instanceof ZodError) {
      log.error(err.issues)
      return res.status(422);
    }

    return res.status(409).send(err)
};
};

const deleteRoomController = async (req: Request<IdParam, {}, {}>, res: Response) => {
  try {
  const room = await RoomModel.findByIdAndDelete(req.params._id)

  if (!room) {
    throw new Error('Error finding room.');
  }

  return res.status(200).send("Room deleted")
  } catch (err: any) {
    if (err instanceof ZodError) {
      log.error(err.issues)
      return res.status(422);
    }

    return res.status(409).send(err)
  }
}

export { getAllRoomsController, getSingleRoomController, createRoomController, updateRoomOccupantController, deleteRoomController };