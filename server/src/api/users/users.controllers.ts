import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ZodError } from 'zod';

import { IdParam } from '../../interfaces/IdParam';
import { RegisterUserType } from './users.schema';

import log from '../../utils/logger';
import { getSingleUserService, registerUserService } from './users.services';
import { UserDocument } from './users.model';


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

const getSingleUserController = async (req: Request<IdParam, UserDocument, {}>, res: Response<UserDocument>, ) => {
  try {
    const user = await getSingleUserService(req.params)

    if (user) {
    return res.send(user)
    }
    
  } catch (err: any) {
    if (err instanceof ZodError) {
      log.error(err.issues)
      return res.status(422);
    }
    // 409 represents CONFLICT
    // thrown if "unique" field fails (ie email already exists)
    // or if required field is not included
    return res.status(409)
};
}

// takes in req.body with 3 register fields and applies them in a Mongo Document
// via the service
const registerUserController = async (req: Request<{}, {}, RegisterUserType["body"]>, res: Response) => {
  try {
    const newUser = await registerUserService(req.body)
    return res.send(newUser)
  } catch (err: any) {
    if (err instanceof ZodError) {
      log.error(err.issues)
      return res.status(422);
    }
    // 409 represents CONFLICT
    // thrown if "unique" field fails (ie email already exists)
    // or if required field is not included
    return res.status(409)
  }
}

export { getSingleUserController, registerUserController }