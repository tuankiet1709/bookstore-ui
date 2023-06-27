import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CartItemModel } from 'src/app/shared/models';
import { CartService } from 'src/app/shared/services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: CartItemModel[] = [];
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  dataSource: CartItemModel[] = [];

  cartSubscription: Subscription;
  cartTotalSub: Subscription;
  cartTotal: number;

  constructor(
    private cartService: CartService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cartTotalSub = this.cartService
      .getTotalListener()
      .subscribe((total) => {
        this.cartTotal = total;
      });

    this.cartSubscription = this.cartService
      .getCartListener()
      .subscribe((_cart: CartItemModel[]) => {
        this.cart = _cart;
        this.dataSource = _cart;
      });
  }

  onRemoveQuantity(item: CartItemModel) {
    this.cartService.removeQuantity(item);
  }

  onAddQuantity(item: CartItemModel) {
    this.cartService.addToCart(item);
  }

  onRemoveFromCart(item: CartItemModel) {
    this.cartService.removeFromCart(item);
  }

  onCheckout() {}

  onClearCart() {}
}
