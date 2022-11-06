export interface IServiceUser<T> {
  create(obj: T): Promise<T>,
  readOneByEmail(email: string): Promise<T>,
}