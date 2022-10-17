import { AuthActions } from "../actions/utils/actionTypes";
import { AuthActionType } from "../actions/utils/constants";

const authReducer = (state = { authData: null }, action: AuthActions) => {
  switch (action.type) {
    case AuthActionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        authData: action?.payload,
        loading: false,
        errors: false,
      };

    case AuthActionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: false };

    default:
      return state;
  }
};

export default authReducer;