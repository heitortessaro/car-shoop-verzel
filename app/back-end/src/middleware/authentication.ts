import { Response, NextFunction } from 'express';
import IRequestWithHeader from '../interfaces/IRequestWithHeader';
import JwtService from '../services/JWT';

export default class AuthenticationMiddleware {
  constructor() { }

  validateAuthorizationToken = async (
    req: IRequestWithHeader,
    _res: Response,
    next: NextFunction,
  ) => {
    const token = req.headers.authorization;
    const decoded = JwtService.validateToken(token as string);
    const { name, lastName, email } = decoded;
    req.body.userInfo = { name, lastName, email };
    next();
  };
}
