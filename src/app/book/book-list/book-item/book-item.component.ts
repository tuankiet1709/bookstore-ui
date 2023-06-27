import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookModel } from 'src/app/shared/models';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent implements OnInit {
  @Input() book?: BookModel;
  @Input() index?: number;
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onAddToCart(): void {
    this.addToCart.emit(this.book);
  }
}
