import { Dispatch } from "redux";
import * as api from "../../api"
import { AuthActions } from "./utils/actionTypes";
import { AuthActionType } from "./utils/constants";

interface ISignInformData {
  email: string,
  password: string
}
export const signIn = (signInformData: ISignInformData) => async (dispatch: Dispatch<AuthActions>) => {
  try {
    const { data } = await api.signIn(signInformData);

    dispatch({ type: AuthActionType.AUTH, payload: data, loading: false, error: false });

  } catch (error) {
    console.log(error);
  }
};


