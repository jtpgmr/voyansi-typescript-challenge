import * as api from "../../api";
import { Dispatch } from "redux";
import { RoomActionType } from "./utils/constants";
import { RoomActions } from "./utils/actionTypes";


// Action Creators
export const fetchRooms = () => async (dispatch: Dispatch<RoomActions>)=> {
  try {
    const { data } = await api.fetchRooms();

    dispatch({
      type: RoomActionType.FETCH_ALL,
      payload: data,
    });

  } catch (err: any) {
    console.log(err.message);
  }
};

// export const updatePost = (id, post) => async (dispatch) => {
//   try {
//     const { data } = await api.updatePost(id, post);

//     dispatch({
//       type: UPDATE,
//       payload: data,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const deletePost = (id) => async (dispatch) => {
//   try {
//     await api.deletePost(id);

//     dispatch({
//       type: DELETE,
//       payload: id,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };