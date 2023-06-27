import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/services';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated: Boolean = false;
  name: string | null = '';
  role: string | null = '';
  search: string = '';
  cartAmount: number;

  authSub: Subscription;
  nameSub: Subscription;
  roleSub: Subscription;
  cartAmountSub: Subscription;

  searchForm: FormGroup = new FormGroup({});

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.name = this.authService.getName();
    this.authSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.nameSub = this.authService.getNameListener().subscribe((name) => {
      this.name = name;
    });

    this.roleSub = this.authService.getRoleListener().subscribe((role) => {
      this.role = role;
    });

    this.cartAmountSub = this.cartService
      .getAmountListener()
      .subscribe((amount) => {
        this.cartAmount = amount;
      });

    this.initForm();
  }

  private initForm() {
    let search = '';

    this.searchForm = new FormGroup({
      search: new FormControl(search),
    });
  }

  onLogout() {
    this.authService.Logout();
    this.router.navigate(['/books']);
  }
}
