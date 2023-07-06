import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private cookieService: CookieService, private router: Router) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | boolean
  //   | UrlTree
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree> {
  //   const isAuth = this.cookieService.get('token');
  //   const role = this.cookieService.get('role');
  //   if (!isAuth) {
  //     this.router.navigate(['/login']);
  //     return false;
  //   } else if (isAuth && role !== 'admin') {
  //     this.router.navigate(['/books']);
  //   }
  //   return true;
  // }

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      take(1),
      map(({ isAuthenticated }) => {
        // allow navigation if authenticated
        if (isAuthenticated) {
          return true;
        }

        // redirect if not authenticated
        return this.router.parseUrl('/login');
      })
    );
  }
}
