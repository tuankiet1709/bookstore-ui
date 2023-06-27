import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BookModel } from '../../models';
import { IBookCreate } from '../../models/book/book-create.model';

@Injectable()
export class BookService {
  constructor(private httpClient: HttpClient) {}

  getBook(): Observable<BookModel[]> {
    return this.httpClient.get<BookModel[]>(environment.book.get);
  }

  getBookDetail(id: string): Observable<BookModel> {
    const url = environment.book.getDetail.replace('{id}', id);
    return this.httpClient.get<BookModel>(url);
  }

  createBook(bookCreate: IBookCreate) {
    const book = {
      title: bookCreate.title,
      image: bookCreate.image,
      quantity: bookCreate.quantity,
      price: bookCreate.price,
      description: bookCreate.description,
      author: bookCreate.author,
      category: bookCreate.category,
    };

    return this.httpClient.post<IBookCreate>(environment.book.get, {
      ...book,
      isDelete: false,
    });
  }

  updateBook(id: string, bookUpdate: IBookCreate) {
    const book = {
      title: bookUpdate.title,
      image: bookUpdate.image,
      quantity: bookUpdate.quantity,
      price: bookUpdate.price,
      description: bookUpdate.description,
      author: bookUpdate.author,
      category: bookUpdate.category,
    };

    return this.httpClient.post<IBookCreate>(environment.book.get + '/' + id, {
      ...book,
      isDelete: false,
    });
  }

  delete(id: string) {
    console.log(id);
    return this.httpClient.delete<BookModel>(environment.book.get + '/' + id);
  }
}
