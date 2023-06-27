export default interface IQueryBookModel {
  id: string;
  search: string;
  sortColumn: string;
  sortBy: number;
  limit: number;
  page: number;
  categoryID: string;
}
