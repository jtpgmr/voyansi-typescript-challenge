import express, { Express, Router } from "express"

const roomRoutes = express.Router();

roomRoutes.get('/', roomRoutes);

export default roomRoutes;