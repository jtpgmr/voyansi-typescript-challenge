import { Router } from 'express';

import * as UsersControllers from './users.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { IdParam } from '../../interfaces/IdParam';
import { userSchema } from './users.schema';

const userRoutes = Router();

// router.get('/', UsersControllers.getAllUsers);

// router.get('/:id', validateRequest({ params: IdParam }), UsersControllers.getUser);

userRoutes.get('/:id', validateRequest({body: userSchema, params: IdParam }), UsersControllers.getSingleUserController);

userRoutes.post('/', validateRequest({ body: userSchema }), UsersControllers.registerUserController);

// router.put('/:id', validateRequest({ params: IdParams, body: Todo }), TodoControllers.updateTodo);

// router.delete('/:id', validateRequest({ params: IdParams }), TodoControllers.deleteTodo);

export default userRoutes;