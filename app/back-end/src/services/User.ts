import { IServiceUser } from '../interfaces/IServiceUser';
import { IUser, UserZodSchema } from '../interfaces/IUser';
import { IModelUser } from '../interfaces/IModelUser';
import { ErrorTypes } from '../errors/catalog';
import HashPassword from './HashPassword';
import { ILogin, LoginZodSchema } from '../interfaces/ILogin';
import JwtService from './JWT';

class UserService implements IServiceUser<IUser, ILogin> {
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
    this.checkUserExists(parsed.data.email)
    const hash: string = HashPassword.encrypt(parsed.data.password);
    const { password, ...userDataWithoutPassword } = parsed.data;
    const userData = { ...userDataWithoutPassword, password: hash }
    return this._user.create(userData);
  }

  private async readOneByEmail(email: string): Promise<IUser> {
    const user = await this._user.readOneByEmail(email);
    if (!user) throw new Error(ErrorTypes.EntityNotFound);
    return user;
  }

  private async checkUserExists(email: string): Promise<void> {
    const user = await this._user.readOneByEmail(email);
    if (user) throw new Error(ErrorTypes.InvalidNewUserData);
  }

  // define o obj como unknown para usar o ZodSchema para checar o formato
  public async login(obj: unknown) {
    const parsed = LoginZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const user = await this.readOneByEmail(parsed.data.email);
    HashPassword.validatePassword(parsed.data.password, user.password);
    const { email, name, lastName } = user;
    const token = JwtService.signToken({ email, name, lastName });
    return token;
  }
}

export default UserService;