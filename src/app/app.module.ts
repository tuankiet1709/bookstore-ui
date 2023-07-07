import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthConfigModule } from './auth/auth-config.module';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthConfigModule,
    AuthModule.forRoot({
      config: {
        configId: 'angular',
        authority: 'http://localhost:8080/auth/realms/demo',
        redirectUrl: 'http://localhost:4200/',
        postLogoutRedirectUri: window.location.host,
        clientId: 'angular',
        scope: 'email', // 'openid profile ' + your scopes
        responseType: 'code',
        usePushedAuthorisationRequests: true,
        silentRenew: true,
        useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: 10,
        logLevel: LogLevel.Debug,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
