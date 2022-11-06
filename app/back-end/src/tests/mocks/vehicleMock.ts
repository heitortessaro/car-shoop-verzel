import { IVehicle } from "../../interfaces/IVehicle";

const vehicleMock: IVehicle = {
  model: 'Uno',
  brand: 'fiat',
  description: 'fiat uno descrição',
  year: 1998,
  color: 'vermelho',
  buyValue: 15000.00,
  image: 'https://quatrorodas.abril.com.br/wp-content/uploads/2019/08/mg_8201.cr2_-e1565631914753.jpg?resize=650,433',
}

const vehicleMockWithId: IVehicle & { _id: string } = {
  _id: '6323930286e451c2a5727b9d',
  model: 'Uno',
  brand: 'fiat',
  description: 'fiat uno descrição',
  year: 1998,
  color: 'vermelho',
  buyValue: 15000.00,
  image: 'https://quatrorodas.abril.com.br/wp-content/uploads/2019/08/mg_8201.cr2_-e1565631914753.jpg?resize=650,433',
}

export {
  vehicleMock,
  vehicleMockWithId
};