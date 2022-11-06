import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { ErrorTypes } from '../errors/catalog';
import 'dotenv/config';

export default class JwtService {
  public static signToken(email: string): string {
    const token = sign(
      email,
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