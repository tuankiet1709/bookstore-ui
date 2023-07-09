import { takeUntil, Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import {
  OidcSecurityService,
  OpenIdConfiguration,
} from 'angular-auth-oidc-client';
import { Login } from 'src/app/shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  configurations: OpenIdConfiguration[];

  $destroy = new Subject();
  Loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public oidcSecurityService: OidcSecurityService
  ) {}

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe((loginResponse: any) => {
      const { isAuthenticated, userData } = loginResponse;

      const token = this.oidcSecurityService.getAccessToken();

      console.log('token: ', token);
      console.log('test: ', isAuthenticated);
    });
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService
      .CreateUser(form.value.email, form.value.password, form.value.name)
      .pipe(takeUntil(this.$destroy))
      .subscribe((res) => {
        this.tabGroup.selectedIndex = 0;
      });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const test = this.oidcSecurityService.authorize();
    console.log('lgoin: ' + test);

    this.authService
      .LoginUser(form.value.emailLogin, form.value.passwordLogin)
      .subscribe((res: Login) => {
        console.log('test login: ', res);
        this.oidcSecurityService.checkAuth().subscribe((res) => {
          console.log('testsetest:', res);
        });
        console.log('login successful');
        this.authService.saveCookie(
          res.userId,
          res.token,
          res.expireAt,
          res.name,
          res.role,
          form.value.emailLogin
        );
        this.authService.setEmailListener(form.value.emailLogin);
        if (res.role == 'admin') {
          this.router.navigate(['/books/management/book-list']);
        } else {
          this.router.navigate(['/books']);
        }
      });
  }

  logout() {
    const test = this.oidcSecurityService.logoff();

    console.log('logout ', test);
  }

  ngOnDestroy(): void {
    this.$destroy.complete();
  }
}
