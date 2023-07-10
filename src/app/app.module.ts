import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractSecurityStorage,
  AuthInterceptor,
  AuthModule,
  LogLevel,
} from 'angular-auth-oidc-client';
import { MyStorageService } from './shared/services/auth/storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule.forRoot({
      config: {
        authority: 'http://localhost:8080/realms/demo',
        redirectUrl: 'http://localhost:4200/',
        postLogoutRedirectUri: 'http://localhost:4200/',
        clientId: 'angular',
        scope: 'openid email roles profile offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        customParamsAuthRequest: {
          client_secret: 'vJUQRBMQmcZcNkByIzWTxGepccdqnQpB',
        },
        customParamsCodeRequest: {
          client_secret: 'vJUQRBMQmcZcNkByIzWTxGepccdqnQpB',
        },
        storage: new MyStorageService(),
        // logLevel: LogLevel.Debug,
      },
    }),
  ],
  providers: [
    { provide: AbstractSecurityStorage, useClass: MyStorageService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
