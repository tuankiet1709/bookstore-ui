export interface Pagination<T> {
    status: string;
    currentPage: number;
    totalItems: number;
    items: T[];
}