export interface BaseService<T> {
    create(value: Omit<T, 'id'>): Promise<string>;
    update(id: number, value: Omit<T, 'id'>): Promise<string>;
    remove(id: number): Promise<string>;
}
