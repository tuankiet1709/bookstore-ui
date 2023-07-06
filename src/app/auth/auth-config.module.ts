import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'http://localhost:8080/auth/realms/demo',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'frontend',
        scope: 'email roles openid profile offline_access', // 'openid profile offline_access ' + your scopes
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
