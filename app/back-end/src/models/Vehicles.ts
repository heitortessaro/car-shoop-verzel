import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IVehicle } from '../interfaces/IVehicle';
import MongoModel from './MongoModels';

// O Mongoose solicita que, ao criarmos um model 
// com a função model(que renomeamos para mongooseCreateModel)
// passemos a ela um esquema (Schema) que deverá ser respeitado. 

// Isso é necessário para que quando o nosso objeto for 
// instanciado, podermos ter acesso a todos os métodos e 
// atributos disponíveis para usarmos.

const vehicleMongooseSchema = new Schema<IVehicle>({
  model: String,
  brand: String,
  description: String,
  year: Number,
  color: String,
  buyValue: Number,
  image: String,
}, { versionKey: false });

class Vehicle extends MongoModel<IVehicle> {
  constructor(model = mongooseCreateModel('Vehicle', vehicleMongooseSchema)) {
    super(model);
  }
}

export default Vehicle;