import { BookModel } from './book.model';

export interface BookGetResponse {
  status: string;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  items: BookModel[];
}
