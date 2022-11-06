import { IUser } from "../../interfaces/IUser";

const userMock: IUser = {
  name: 'Nome',
  lastName: 'Sobrenome',
  email: 'test@test.com',
  password: '12345678912345789',
}

const userMockkWithId: IUser & { _id: string } = {
  _id: '6323930286e451c2a5727b9d',
  name: 'Nome',
  lastName: 'Sobrenome',
  email: 'test@test.com',
  password: '12345678912345789',
}

export {
  userMock,
  userMockkWithId
};