import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, Subject, takeUntil } from 'rxjs';
import { CartItemModel } from 'src/app/shared/models';
import { CartService } from 'src/app/shared/services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cart: CartItemModel[] = [];
  displayedColumns: string[] = [
    'productImage',
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
  $destroy = new Subject();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartTotal = this.cartService.getTotal();
    this.cartTotalSub = this.cartService
      .getTotalListener()
      .pipe(takeUntil(this.$destroy))
      .subscribe((total) => {
        this.cartTotal = total;
      });

    this.cartSubscription = this.cartService
      .getCartListener()
      .pipe(takeUntil(this.$destroy))
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

  onCheckout() {
    this.cartService.checkout();
  }

  onClearCart() {
    this.cartService.clearAll();
  }

  ngOnDestroy(): void {
    this.$destroy.complete();
  }
}
