import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { ErrorTypes } from '../errors/catalog';

export default class HashPassword {
  public static encrypt(password: string): string {
    const salt = genSaltSync(10);
    const hashPassword: string = hashSync(password, salt);
    return hashPassword;
  }

  public static validatePassword(password: string, hash: string): void {
    if (!compareSync(password, hash)) {
      throw new Error(ErrorTypes.InvalidLoginData)
    }
  }
}
