import {
  OidcSecurityService,
  PublicEventsService,
} from 'angular-auth-oidc-client';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'bookstore-ui';
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private eventService: PublicEventsService
  ) {}
  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe((loginResponse: any) => {
      const { isAuthenticated, idToken } = loginResponse;
      console.log('app module isAuthenticated: ' + isAuthenticated);
      console.log('app module: ' + idToken);
    });
  }

  login() {
    const test = this.oidcSecurityService.authorize();
    console.log('lgoin: ' + test);
  }
}
