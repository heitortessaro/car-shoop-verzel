import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { ErrorTypes } from '../errors/catalog';
import 'dotenv/config';
import { IUser } from '../interfaces/IUser';

export default class JwtService {
  public static signToken(userInfo: Omit<IUser, 'password'>): string {
    const token = sign(
      userInfo,
      process.env.JWT_SECRET || 'easypassword', {
      expiresIn: '6h',
      algorithm: 'HS256',
    });
    return token;
  }

  public static validateToken(token: string): JwtPayload {
    try {
      const decoded = verify(
        token,
        process.env.JWT_SECRET || 'easypassword'
      );
      return decoded as JwtPayload;
    } catch (error) {
      throw new Error(ErrorTypes.InvalidJWT)
    }
  }
}