import { IModel } from "./IModel";

export interface IModelUser<T> extends IModel<T> {
  readOneByEmail(email: string): Promise<T | null>,
}
