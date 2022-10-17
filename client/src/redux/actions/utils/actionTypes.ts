import { RoomActionType, AuthActionType } from "./constants"

// Room Actions
interface FetchAllRoomsAction {
    type: RoomActionType.FETCH_ALL,
    payload: any[]
}

interface UpdateRoomOccupantAction {
  type: RoomActionType.UPDATE_OCCUPANT,
  payload: any[]
}

interface ClearRoomOccupantAction {
  type: RoomActionType.REMOVE_OCCUPANT,
  payload: any[]
}

// Auth Actions
interface AuthorizeAction {
  type: AuthActionType.AUTH,
  payload: any,
  loading: boolean,
  error: boolean | Error
}

interface LogoutAction {
type: AuthActionType.LOGOUT,
payload: any[]
loading: string,
error: Error
}

export type RoomActions = FetchAllRoomsAction | UpdateRoomOccupantAction | ClearRoomOccupantAction;

export type AuthActions = AuthorizeAction | LogoutAction