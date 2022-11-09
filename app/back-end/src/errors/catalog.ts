export enum ErrorTypes {
  InvalidRoute = 'InvalidRoute',
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
  InvalidNewData = 'InvalidNewData',
  InvalidLoginData = 'InvalidLoginData',
  InvalidJWT = 'InvalidJWT',
  InvalidNewUserData = 'InvalidNewUserData',
  InvalidFileSize = 'InvalidFileSize',
  InvalidFileType = 'InvalidFileType',
}

// obj para construir a resposta da API
type ErrorResponseObject = {
  message: string,
  httpStatus: number,
};

export type ErrorCatalog = {
  // cada chave de objeto é uma chave para o enum ErrorTypes
  // e cada valor é a resposta da API
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
  InvalidRoute: {
    message: 'Invalid route. Route does not exist.',
    httpStatus: 404,
  },
  EntityNotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  InvalidNewData: {
    message: 'Invalid new data. An equal register already exists in the database',
    httpStatus: 400,
  },
  InvalidLoginData: {
    message: 'Invalid login data. Incorrect email or password',
    httpStatus: 401,
  },
  InvalidJWT: {
    message: 'Invalid JWT. Token must be a valid',
    httpStatus: 401,
  },
  InvalidNewUserData: {
    message: 'Invalid new user data. User already exists',
    httpStatus: 400,
  },
  InvalidFileSize: {
    message: 'Invalid file size. Its size should not be larger than 3mb',
    httpStatus: 400,
  },
  InvalidFileType: {
    message: 'Invalid file type. Only jpeg and png files are accepted.',
    httpStatus: 400,
  },
};