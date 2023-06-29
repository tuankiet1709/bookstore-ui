import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.bookService.getById(id).subscribe((response: BookModel) => {
        this.book = response;
      });
    });
  }

  onAddToCart(): void {
    this.cartService.addToCart({
      product: this.book.image,
      name: this.book.title,
      price: this.book.price,
      quantity: 1,
      id: this.book.id,
    });
  }
}
