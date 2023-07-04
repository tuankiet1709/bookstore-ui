import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { BookModel } from 'src/app/shared/models';
import { BookService, CartService } from 'src/app/shared/services';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book: BookModel;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: Params) => {
          return this.bookService.getById(params['id']);
        })
      )
      .subscribe((book: BookModel) => {
        this.book = book;
      });
  }

  onAddToCart(): void {
    this.cartService.addToCart({
      productImage: this.book.image,
      name: this.book.title,
      price: this.book.price,
      quantity: 1,
      productId: this.book.id.toString(),
      id: '1',
    });
  }
}
