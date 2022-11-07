import { IncomingHttpHeaders } from 'http';
import { Request } from 'express';

// explicação: https://javascript.plainenglish.io/how-to-create-custom-headers-with-express-and-typescript-b964d3f0be89

export default interface IRequestAuthorization extends Request {
  headers: IncomingHttpHeaders & {
    authorization?: string,
  }
}
