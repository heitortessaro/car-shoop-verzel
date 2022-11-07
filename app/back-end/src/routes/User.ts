import { Router, Request, Response } from 'express';
import UserController from '../controllers/User';
import UserService from '../services/User';
import UserModel from '../models/User';

const route = Router();

const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

const baseURL = '/users';

route.post(baseURL, (req: Request, res: Response) =>
  userController.create(req, res));
route.post(baseURL, (req: Request, res: Response) =>
  userController.login(req, res));

export default route;