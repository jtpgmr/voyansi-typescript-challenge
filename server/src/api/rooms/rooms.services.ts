import _, { update } from "lodash";
import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import log from "../../utils/logger";
import RoomModel, { RoomDocument, CreateRoomInput } from "./rooms.model";

const getAllRoomsService = async () => {
  return await RoomModel.find()
}

const getSingleRoomService = async () => {

}

const createRoomService = async (roomDocumentEntry: CreateRoomInput) => {
  return RoomModel.create(roomDocumentEntry)
};



export { getAllRoomsService, getSingleRoomService, createRoomService };
