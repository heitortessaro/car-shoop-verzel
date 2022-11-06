export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
  InvalidNewData = 'InvalidNewData',
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
};