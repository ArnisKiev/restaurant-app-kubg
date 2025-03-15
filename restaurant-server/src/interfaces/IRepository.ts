export interface IRepository<T> {
    create(item: T);
    delete(item: any);
    update(item: T);
}