import { RoomActions } from "../actions/utils/actionTypes";
import { RoomActionType } from "../actions/utils/constants";

const roomReducer = (rooms = [], action: RoomActions) => {
  switch (action.type) {
    case RoomActionType.FETCH_ALL:
      return action.payload;

    case RoomActionType.UPDATE_OCCUPANT:
      return rooms.map((room) =>
      room
      );
      
    case RoomActionType.REMOVE_OCCUPANT:
      return rooms.filter((room) => room);
    default:
      return rooms;
  }
};

export default roomReducer;