import _ from "lodash";
import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import log from "../../utils/logger";
import RoomModel, { RoomDocument, CreateRoomInput } from "./rooms.model";

const getAllRoomsService = async () => {
  const rooms = await RoomModel.find()
  // return _.omit(rooms, ["_id"]);
  const filteredRoom = _.map(rooms, function (room) {
    return _.omit(room.toJSON(), ["_id"])
  })
  return filteredRoom
}

const getSingleRoomService = async () => {

}

const createRoomService = async (roomDocumentEntry: CreateRoomInput) => {
  return RoomModel.create(roomDocumentEntry)
};



export { getAllRoomsService, getSingleRoomService, createRoomService };
