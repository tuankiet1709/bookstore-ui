import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { AuthConfigModule } from './auth/auth-config.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    // AuthConfigModule,
    AuthModule.forRoot({
      config: {
        configId: 'angular',
        authority: 'http://localhost:8080/auth/realms/demo',
        redirectUrl: 'http://localhost:4200/',
        postLogoutRedirectUri: 'http://localhost:4200/books',
        clientId: 'angular',
        scope: 'email profile offline_access', // 'openid profile ' + your scopes
        responseType: 'code',
        usePushedAuthorisationRequests: true,
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
        customParamsAuthRequest: {
          client_secret: 'VERCLdeHWki1vbnGKO5qiKmUuYaLAj9t',
        },
        customParamsCodeRequest: {
          client_secret: 'VERCLdeHWki1vbnGKO5qiKmUuYaLAj9t',
        },
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
