import axios from "axios";


const PORT = process.env.REACT_APP_PORT || 4000;

const API = axios.create({ baseURL: `http://localhost:${PORT}` });

// rooms Routes
export const fetchRooms = () => API.get("/rooms");
export const updateRoomOccupant = (id: any, updatedPost: any) =>
  API.patch(`/rooms/${id}`, updatedPost);

// users Routes
export const signIn = (formData: any) => API.post("/users/signin", formData);
export const signUp = (formData: any) => API.post("/users/signup", formData);