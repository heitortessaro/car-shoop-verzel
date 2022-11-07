import { Request, Response } from 'express';
import { ILogin } from '../interfaces/ILogin';
import { IServiceUser } from '../interfaces/IServiceUser';
import { IUser } from '../interfaces/IUser';

class UserController {
  constructor(private _service: IServiceUser<IUser, ILogin>) { }

  public async create(req: Request, res: Response) {
    const result = await this._service.create(req.body);
    const { password, ...userInfo } = result;
    return res.status(201).json(userInfo);
  }

  public async login(req: Request, res: Response) {
    const result = await this._service.login(req.body);
    return res.status(200).json(result);
  }
}

export default UserController;