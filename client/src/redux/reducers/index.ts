import { combineReducers } from "@reduxjs/toolkit";
import rooms from "./rooms.reducers";
// import auth from "./auth.reducers"

export const rootReducer = combineReducers({ rooms });