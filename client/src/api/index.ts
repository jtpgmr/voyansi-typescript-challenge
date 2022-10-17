import axios from "axios";

const PORT = process.env.REACT_APP_PORT || 4000;

const API = axios.create({ baseURL: `http://localhost:${PORT}` });

// rooms Routes
export const fetchRooms = () => API.get("/api/rooms");
export const updateRoomOccupant = (id: any, updatedPost: any) =>
  API.patch(`/rooms/${id}`, updatedPost);

// users Routes
export const signIn = (authformData: any) => API.post("/users/signin", authformData);
export const signUp = (authformData: any) => API.post("/users/signup", authformData);