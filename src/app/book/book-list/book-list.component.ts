import { BookService } from './../../shared/services/book/book.service';
import { BookModel } from './../../shared/models/book/book.model';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services';
import { CartItemModel } from 'src/app/shared/models';

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
  cols = 4;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  books: BookModel[] = [];
  bookDisplay: BookModel[] = [];
  category: string | undefined;

  constructor(
    private bookService: BookService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBook().subscribe((response: BookModel[]) => {
      this.books = response;
      this.bookDisplay = response;
    });
  }

  onShowCategory(newCategory: string): void {
    this.bookDisplay = this.books.filter((book) => {
      return book.category.id.toString() == newCategory.toString();
    });
  }

  onAddToCart(book: BookModel): void {
    const cartItem: CartItemModel = {
      product: book.image,
      name: book.title,
      price: book.price,
      quantity: 1,
      id: book.id,
    };

    this.cartService.addToCart(cartItem);
  }
}
