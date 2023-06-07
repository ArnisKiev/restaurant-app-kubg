export interface IRepository<T> {
    create(item: T);
    delete(item: T);
    update(item: T);
    findById(id: any);
    
}