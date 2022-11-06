import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IVehicle } from '../interfaces/IVehicle';

class VehicleController {
  constructor(private _service: IService<IVehicle>) { }

  public async create(req: Request, res: Response) {
    const result = await this._service.create(req.body);
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

  public async update(req: Request, res: Response) {
    const result = await this._service.update(req.params.id, req.body);
    return res.status(200).json(result);
  }
}

export default VehicleController;