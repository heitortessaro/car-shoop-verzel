import { Router, Request, Response } from 'express';
import VehicleController from '../controllers/Vehicle';
import VehicleService from '../services/Vehicle';
import VehicleModel from '../models/Vehicles';
import AuthenticationMiddleware from '../middleware/authentication';
import multer from 'multer';
import { ErrorTypes } from '../errors/catalog';
import MulterRequest from '../interfaces/IRequestMulter';

// define como os arquivos serão armazenados
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, 'uploads/');
  },
  filename: function (req: Request, file: any, cb: any) {
    cb(null, new Date().toISOString() + file.originalname);
  }
})

const fileFilter = (_req: Request, file: any, cb: any) => {
  // rejeita arquivos diferentes de jpeg e png
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(
      () => { throw new Error(ErrorTypes.InvalidFileType) }
      , false
    );
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 3 },
  fileFilter: fileFilter
})
const route = Router();

const authenticationMiddleware = new AuthenticationMiddleware();
const vehicleModel = new VehicleModel();
const vehicleService = new VehicleService(vehicleModel);
const vehicleController = new VehicleController(vehicleService);

const baseURL = '/vehicles';

route.post(
  baseURL,
  authenticationMiddleware.validateAuthorizationToken,
  upload.single('vehicleImage'),
  (req: MulterRequest, res: Response) => vehicleController.create(req, res)
);
route.get(
  baseURL,
  (req: Request, res: Response) => vehicleController.read(req, res)
);
route.get(
  `${baseURL}/:id`,
  (req: Request, res: Response) => vehicleController.readOneById(req, res)
);
route.put(
  `${baseURL}/:id`,
  authenticationMiddleware.validateAuthorizationToken,
  (req: Request, res: Response) => vehicleController.update(req, res)
);
route.delete(
  `${baseURL}/:id`,
  authenticationMiddleware.validateAuthorizationToken,
  (req: Request, res: Response) => vehicleController.delete(req, res)
);

export default route;