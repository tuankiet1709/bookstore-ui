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
export class AppComponent {
  title = 'bookstore-ui';
}
