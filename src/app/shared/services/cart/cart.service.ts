import { Injectable } from '@angular/core';
import { CartItemModel } from '../../models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookService } from '../book/book.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartListener = new BehaviorSubject<CartItemModel[]>([]);
  private cartTotalListener = new BehaviorSubject<number>(0);
  private cartAmountListener = new BehaviorSubject<number>(0);
  private cart: CartItemModel[] = [];
  private total: number = 0;
  private amount: number = 0;

  constructor(
    private httpClient: HttpClient,
    private bookService: BookService
  ) {
    this.get().subscribe((res) => {
      this.cartListener.next(res);
      this.setAmount(res);
      this.setTotal(res);
    });
  }

  getCart() {
    return this.cart;
  }

  getCartListener(): Observable<CartItemModel[]> {
    return this.cartListener.asObservable();
  }

  getTotal(): number {
    return this.total;
  }

  getTotalListener(): Observable<number> {
    return this.cartTotalListener.asObservable();
  }

  getAmount(): number {
    return this.amount;
  }

  getAmountListener(): Observable<number> {
    return this.cartAmountListener.asObservable();
  }

  setTotal(items: CartItemModel[]): void {
    const total = items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);

    this.total = total;
    this.cartTotalListener.next(total);
  }

  setAmount(items: CartItemModel[]): void {
    const amount = items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);

    this.amount = amount;
    this.cartAmountListener.next(amount);
  }

  addTotal(item: CartItemModel) {
    this.total += item.price;
    this.cartTotalListener.next(this.total);
  }

  addAmount() {
    this.amount++;
    this.cartAmountListener.next(this.amount);
  }

  removeTotal(item: CartItemModel) {
    this.total -= item.price;
    this.cartTotalListener.next(this.total);
  }

  removeAmount() {
    if (this.amount > 0) {
      this.amount--;
    }
    this.cartAmountListener.next(this.amount);
  }

  get(): Observable<CartItemModel[]> {
    return this.httpClient.get<CartItemModel[]>(environment.cart.get);
  }

  post(item: CartItemModel) {
    return this.httpClient.post(environment.cart.get, item);
  }

  addQuantity(item: CartItemModel) {
    return this.httpClient.put(environment.cart.get + '/' + item.id, item);
  }

  delete(item: CartItemModel) {
    return this.httpClient.delete(environment.cart.get + '/' + item.id);
  }

  addToCart(item: CartItemModel): void {
    const items = [...this.cart];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      this.bookService.getById(itemInCart.id.toString()).subscribe((res) => {
        if (itemInCart.quantity + 1 < res.quantity) {
          itemInCart.quantity += 1;
          this.addQuantity(itemInCart).subscribe((res) => {
            console.log('add item successfully');
            this.addAmount();
            this.addTotal(item);
          });
        }
      });
    } else {
      this.post(item).subscribe((res) => {
        console.log('add to cart successfully');
        items.push(item);
        this.addAmount();
        this.addTotal(item);
      });
    }

    this.cart = items;
    this.cartListener.next(items);
    console.log(this.cart);
  }

  removeFromCart(item: CartItemModel, updateCart = true): CartItemModel[] {
    this.delete(item).subscribe((res) => {
      this.removeAmount();
      this.removeTotal(item);
    });
    const filteredItems = this.cart.filter((_item) => {
      return _item.id !== item.id;
    });

    if (updateCart) {
      this.cart = filteredItems;
      this.cartListener.next(filteredItems);
    }

    return filteredItems;
  }

  removeQuantity(item: CartItemModel): void {
    let itemForRemoval!: CartItemModel;

    let filteredItems = this.cart.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        this.removeAmount();
        this.removeTotal(_item);
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cart = filteredItems;
    this.cartListener.next(filteredItems);
  }
}
