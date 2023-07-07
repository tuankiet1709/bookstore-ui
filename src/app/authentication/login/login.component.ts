import { takeUntil, Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/models';
import {
  OidcSecurityService,
  OpenIdConfiguration,
} from 'angular-auth-oidc-client';
import { v4 as uuidv4 } from 'uuid';

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
    this.configurations = this.oidcSecurityService.getConfigurations();

    console.log('configuration: ', this.configurations);

    this.oidcSecurityService
      .checkAuth('angular')
      .subscribe((loginResponse: any) => {
        const { isAuthenticated, userData, accessToken, idToken, configId } =
          loginResponse;

        console.log('test: ', loginResponse);
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

    const authOptions = {
      customParams: {
        grant_type: 'password',
        client_secret: 's2UV05MWYLWBFTQNzacDQmWWGkEVlc22',
        username: form.value.emailLogin,
        password: form.value.passwordLogin,
      },
    };

    const test = this.oidcSecurityService.authorize('angular', authOptions);
    console.log('test: ', test);

    // this.authService
    //   .LoginUser(form.value.emailLogin, form.value.passwordLogin)
    //   .subscribe((res: Login) => {
    //     console.log('test login: ', res);
    //     this.oidcSecurityService.checkAuth().subscribe((res) => {
    //       console.log('testsetest:', res);
    //     });
    //     console.log('login successful');
    //     this.authService.saveCookie(
    //       res.userId,
    //       res.token,
    //       res.expireAt,
    //       res.name,
    //       res.role,
    //       form.value.emailLogin
    //     );
    //     this.authService.setEmailListener(form.value.emailLogin);
    //     if (res.role == 'admin') {
    //       this.router.navigate(['/books/management/book-list']);
    //     } else {
    //       this.router.navigate(['/books']);
    //     }
    //   });
  }

  logout() {
    const test = this.oidcSecurityService.logoff('angular');
    console.log('logout ', test);
  }

  ngOnDestroy(): void {
    this.$destroy.complete();
  }
}
