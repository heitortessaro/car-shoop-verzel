import { IServiceUser } from '../interfaces/IServiceUser';
import { IUser, UserZodSchema } from '../interfaces/IUser';
import { IModelUser } from '../interfaces/IModelUser';
import { ErrorTypes } from '../errors/catalog';

class UserService implements IServiceUser<IUser> {
  // implementa a interface IUser no modelo, definindo o generics T
  private _user: IModelUser<IUser>;
  constructor(model: IModelUser<IUser>) {
    this._user = model;
  }

  // methods
  public async create(obj: unknown) {
    // define o obj como unknown para usar o ZodSchema para checar o formato
    const parsed = UserZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._user.create(parsed.data);
  }

  public async readOneByEmail(email: string): Promise<IUser> {
    const user = await this._user.readOneByEmail(email);
    if (!user) throw new Error(ErrorTypes.EntityNotFound);
    return user;
  }
}

export default UserService;