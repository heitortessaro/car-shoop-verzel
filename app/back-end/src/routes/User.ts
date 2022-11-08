import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/User';
import UserService from '../services/User';
import UserModel from '../models/User';
import AuthenticationMiddleware from '../middleware/authentication';

const route = Router();

const authenticationMiddleware = new AuthenticationMiddleware();
const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

const baseURL = '/users';

route.post(
  `${baseURL}/create`,
  authenticationMiddleware.validateAuthorizationToken,
  (req: Request, res: Response) => userController.create(req, res)
);
route.post(
  baseURL,
  (req: Request, res: Response) => userController.login(req, res)
);

export default route;