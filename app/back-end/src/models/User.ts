import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IModelUser } from '../interfaces/IModelUser';
import { IUser } from '../interfaces/IUser';
import MongoModel from './MongoModels';

// O Mongoose solicita que, ao criarmos um model 
// com a função model(que renomeamos para mongooseCreateModel)
// passemos a ela um esquema (Schema) que deverá ser respeitado. 

// Isso é necessário para que quando o nosso objeto for 
// instanciado, podermos ter acesso a todos os métodos e 
// atributos disponíveis para usarmos.

const userMongooseSchema = new Schema<IUser>({
  name: String,
  lastName: String,
  email: String,
  password: String,
}, { versionKey: false });

class User extends MongoModel<IUser> implements IModelUser<IUser>{
  constructor(model = mongooseCreateModel('User', userMongooseSchema)) {
    super(model);
  }

  public async readOneByEmail(email: string): Promise<IUser | null> {
    return this._model.findOne({ email });
  }
}

export default User;