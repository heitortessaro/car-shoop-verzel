export interface IServiceUser<T, Y> {
  create(obj: T): Promise<T>,
  login(obj: Y): Promise<string>,
}