import { BookService } from './../../shared/services/book/book.service';
import { BookModel } from './../../shared/models/book/book.model';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services';
import { CartItemModel } from 'src/app/shared/models';
import { BookGetResponse } from 'src/app/shared/models/book/book-response.model';
import { ActivatedRoute } from '@angular/router';

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 500,
  3: 450,
  4: 450,
  5: 450,
};

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  page: number = 1;
  limit: number = 12;
  total: number = 0;
  search: String = '';

  cols = 4;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  books: BookModel[] = [];
  bookDisplay: BookModel[] = [];
  category: string | undefined = 'abc';

  constructor(
    private bookService: BookService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBooks();

    this.route.queryParams.subscribe((params) => {
      console.log(params['search']);
      this.search = params['search'] ?? '';
      this.getBooks();
    });
  }

  getBooks() {
    this.bookService
      .getBook(this.limit, this.page, this.search)
      .subscribe((response: BookGetResponse) => {
        this.books = response.items;
        this.bookDisplay = response.items;
        this.total = response.totalItems;
      });
  }

  onShowCategory(newCategory: string): void {
    if (this.category !== newCategory) {
      this.category = newCategory;
      this.bookService
        .getBookByCategory(newCategory)
        .subscribe((response: BookGetResponse) => {
          this.books = response.items;
          this.bookDisplay = response.items;
          this.total = response.totalItems;
        });
    }
  }

  onAddToCart(book: BookModel): void {
    const cartItem: CartItemModel = {
      productImage: book.image,
      name: book.title,
      price: book.price,
      quantity: 1,
      productId: book.id.toString(),
      id: '1',
    };

    this.cartService.addToCart(cartItem);
  }

  pageChangeEvent(event: any) {
    this.page = event;
    this.getBooks();
  }
}
