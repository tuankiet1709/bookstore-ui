import { Injectable } from '@angular/core';
import { CartItemModel } from '../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, take, pipe, tap } from 'rxjs';
import { BookService } from '../book/book.service';
import { AuthService } from '../auth/auth.service';
import { CartCreateModel } from '../../models/cart/cart-create.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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
  private email: string = this.authService.getEmail() ?? '';

  constructor(
    private httpClient: HttpClient,
    private bookService: BookService,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {
    this.get(this.email)
      .pipe(
        tap((res) => {
          console.log(res);
        })
      )
      .subscribe((res) => {
        this.cart = res;
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
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);

    this.total = total;
    this.cartTotalListener.next(total);
  }

  setAmount(items: CartItemModel[]): void {
    const amount = items
      .map((item) => item.quantity)
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

  get(email: string | null): Observable<CartItemModel[]> {
    const url = environment.cart.get.replace('{email}', email ?? '');
    return this.httpClient.get<CartItemModel[]>(url);
  }

  post(item: CartCreateModel) {
    return this.httpClient.post(environment.cart.addToCart, item);
  }

  updateQuantity(id: string, quantity: number) {
    const url = environment.cart.updateQuantity.replace('{id}', id);
    return this.httpClient.put(url, { quantity: quantity });
  }

  delete(id: string) {
    const url = environment.cart.removeFromCart.replace('{id}', id);
    return this.httpClient.delete(url);
  }

  addToCart(item: CartItemModel): void {
    const items = [...this.cart];

    const itemInCart = items.find(
      (_item) => _item.productId === item.productId
    );

    if (itemInCart) {
      this.bookService
        .getById(itemInCart.productId.toString())
        .subscribe((res) => {
          if (itemInCart.quantity + 1 < res.quantity) {
            itemInCart.quantity += 1;
            this.updateQuantity(itemInCart.id, itemInCart.quantity).subscribe(
              (res) => {
                console.log('add item successfully');
                this.addAmount();
                this.addTotal(item);
              }
            );
          }
        });
    } else {
      const newItem: CartCreateModel = {
        product: item.productId,
        quantity: 1,
        user: this.email,
      };
      this.post(newItem).subscribe((res) => {
        console.log('add to cart successfully');
        items.push(item);
        this.addAmount();
        this.addTotal(item);
      });
    }

    this.cart = items;
    this.cartListener.next(items);
  }

  removeFromCart(item: CartItemModel): CartItemModel[] {
    this.delete(item.id).subscribe((res) => {});
    const filteredItems = this.cart.filter((_item) => {
      return _item.id !== item.id;
    });

    this.setAmount(filteredItems);
    this.setTotal(filteredItems);
    this.cart = filteredItems;
    this.cartListener.next(filteredItems);

    return filteredItems;
  }

  removeQuantity(item: CartItemModel): void {
    let filteredItems = this.cart.map((_item) => {
      if (_item.productId === item.productId && item.quantity - 1 > 0) {
        _item.quantity--;
        this.updateQuantity(_item.id, _item.quantity).subscribe(() => {
          console.log('update successfully');
          this.removeAmount();
          this.removeTotal(_item);
        });
      }
      return _item;
    });

    this.cart = filteredItems;
    this.cartListener.next(filteredItems);
  }

  checkout() {
    const url = environment.cart.checkout.replace('{email}', this.email ?? '');
    this.httpClient.post(url, null).subscribe((res) => {
      if (res) {
        this.cart = [];
        this.cartListener.next([]);
      }
    });
  }

  clearAll() {
    const url = environment.cart.clearCart.replace('{email}', this.email ?? '');
    this.httpClient.delete(url).subscribe((res) => {
      if (res) {
        this.cart = [];
        this.cartListener.next([]);
      }
    });
  }
}
