export default interface IQueryBookModel {
  search: string;
  sortColumn: string;
  sortBy: number;
  limit: number;
  page: number;
  categoryID: string;
}
