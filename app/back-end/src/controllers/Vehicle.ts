import { Request, Response } from 'express';
import IMulterRequest from '../interfaces/IRequestMulter';
import { IServiceVehicle } from '../interfaces/IServiceVehicle';
import { IVehicle } from '../interfaces/IVehicle';

class VehicleController {
  constructor(private _service: IServiceVehicle<IVehicle>) { }

  public async create(req: IMulterRequest, res: Response) {
    const vehicleInfo: IVehicle = {
      model: req.body.model,
      brand: req.body.brand,
      description: req.body.description,
      year: parseInt(req.body.year),
      color: req.body.color,
      buyValue: parseFloat(req.body.buyValue),
      image: `/${req.file.path}`,
    }
    const result = await this._service.create(vehicleInfo);
    return res.status(201).json(result);
  }

  public async read(req: Request, res: Response<IVehicle[]>) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOneById(req: Request, res: Response) {
    const result = await this._service.readOneById(req.params.id);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response) {
    const result = await this._service.delete(req.params.id);
    return res.status(200).json(result);
  }

  public async update(req: IMulterRequest, res: Response) {
    const vehicleInfo: IVehicle = {
      model: req.body.model,
      brand: req.body.brand,
      description: req.body.description,
      year: parseInt(req.body.year),
      color: req.body.color,
      buyValue: parseFloat(req.body.buyValue),
      image: `/${req.file.path}`,
    }
    const result = await this._service.update(req.params.id, vehicleInfo);
    return res.status(200).json(result);
  }
}

export default VehicleController;