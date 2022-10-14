import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ZodError } from 'zod';

import { IdParam } from '../../interfaces/IdParam';
import { RegisterUserType } from '../../schemas/user.schema';

import log from '../../utils/logger';
import { registerUserService } from './users.services';


// export const getAllUsers = async (
//   req: Request, 
//   res: Response<TodoWithId[]>, 
//   next: NextFunction) => {
//   try {
//     const users = await Todos.find().toArray();
//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getUser = async (req: Request<IdParam, TodoWithId, {}>, res: Response<TodoWithId>, next: NextFunction) => {
//   try {
//     const user = await Todos.findOne({
//       _id: new Types.ObjectId(req.params.id),
//     });
//     console.log(user);
//     if (!user) {
//       res.status(404);
//       throw new Error(`Todo with id "${req.params.id}" not found.`);
//     }
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// takes in req.body with 3 register fields and applies them in a Mongo Document
// via the service
export const registerUserController = async (req: Request<{}, {}, RegisterUserType["body"]>, res: Response) => {
  try {
    const newUser = await registerUserService(req.body)
    return res.send(newUser)
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(422);
    }
    // 409 represents CONFLICT
    // thrown if "unique" field fails (ie email already exis)
    log.error(err)
    return res.status(409).send(err.message)
  }
}