import express, { Request, Response } from 'express';

import roomRoutes from './rooms/rooms.routes';
import sessionRoutes from './sessions/sessions.routes';
import userRoutes from './users/users.routes';
// import users from './users/users.routes';

// const apiRoutes = (app: Express) => {

// app.get("/apiHealth", (req: Request, res: Response) => res.sendStatus(200))

// app.use('/rooms', roomRoutes);
// // router.use('/users', users);
// }

const apiRoutes = express.Router();

  apiRoutes.get("/apiHealth", (req: Request, res: Response) => res.sendStatus(200))
  
  apiRoutes.use('/rooms', roomRoutes);
  apiRoutes.use('/users', userRoutes);
  apiRoutes.use('/sessions', sessionRoutes);


export default apiRoutes;