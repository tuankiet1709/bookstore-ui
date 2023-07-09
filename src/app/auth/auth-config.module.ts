import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthRoutingModule } from './auth-routing.module';
@NgModule({
  imports: [
    AuthRoutingModule,
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
  exports: [AuthModule],
  declarations: [UnauthorizedComponent],
})
export class AuthConfigModule {}
