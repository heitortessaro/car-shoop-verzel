import { Router, Request, Response } from 'express';
import VehicleController from '../controllers/Vehicle';
import VehicleService from '../services/Vehicle';
import VehicleModel from '../models/Vehicles';

const route = Router();

const vehicleModel = new VehicleModel();
const vehicleService = new VehicleService(vehicleModel);
const vehicleController = new VehicleController(vehicleService);

const baseURL = '/vehicles';

route.post(baseURL, (req: Request, res: Response) =>
  vehicleController.create(req, res));
route.get(baseURL, (req: Request, res: Response) =>
  vehicleController.read(req, res));
route.get(`${baseURL}/:id`, (req: Request, res: Response) =>
  vehicleController.readOneById(req, res));
route.put(`${baseURL}/:id`, (req: Request, res: Response) =>
  vehicleController.update(req, res));
route.delete(`${baseURL}/:id`, (req: Request, res: Response) =>
  vehicleController.delete(req, res));

export default route;