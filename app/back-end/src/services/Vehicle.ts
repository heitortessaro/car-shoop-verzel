import { IService } from '../interfaces/IService';
import { IVehicle, VehicleZodSchema } from '../interfaces/IVehicle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class VehicleService implements IService<IVehicle> {
  // implementa a interface IVegucke no modelo, definindo o generics T
  private _vehicle: IModel<IVehicle>;
  constructor(model: IModel<IVehicle>) {
    this._vehicle = model;
  }

  // methods

  public async create(obj: unknown) {
    // define o obj como unknown para usar o ZodSchema para checar o formato
    const parsed = VehicleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._vehicle.create(parsed.data);
  }

  public async read(): Promise<IVehicle[]> {
    const vehicles = await this._vehicle.read();
    if (!vehicles) throw new Error(ErrorTypes.EntityNotFound);
    return vehicles;
  }

  public async readOneById(_id: string): Promise<IVehicle> {
    const vehicle = await this._vehicle.readOneById(_id);
    if (!vehicle) throw new Error(ErrorTypes.EntityNotFound);
    return vehicle;
  }

  public async update(_id: string, obj: unknown): Promise<IVehicle> {
    // define o obj como unknown para usar o ZodSchema para checar o formato
    const parsed = VehicleZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const vehicle = await this._vehicle.update(_id, parsed.data);
    if (!vehicle) throw new Error(ErrorTypes.EntityNotFound);
    return vehicle;
  }

  public async delete(_id: string): Promise<IVehicle> {
    const vehicle = await this._vehicle.delete(_id);
    if (!vehicle) throw new Error(ErrorTypes.EntityNotFound);
    return vehicle;
  }
}

export default VehicleService;