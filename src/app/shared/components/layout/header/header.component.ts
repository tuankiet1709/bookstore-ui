import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
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
    private oidcSecurityService: OidcSecurityService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe((loginResponse) => {
      const { isAuthenticated, userData } = loginResponse;
      this.userIsAuthenticated = isAuthenticated;
      this.name = userData.name;
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

  onSubmit() {
    const formData = this.searchForm.value;
    this.router.navigate(['/books'], {
      queryParams: { search: formData['search'] },
    });
  }

  onLogin() {
    this.oidcSecurityService.authorize();
  }

  onLogout() {
    this.oidcSecurityService.logoff();
  }
}
