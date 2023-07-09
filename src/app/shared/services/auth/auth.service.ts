import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthData, AuthDataRegister, Login } from '../../models';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  OidcSecurityService,
  OpenIdConfiguration,
} from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private configurations: OpenIdConfiguration[];
  public authStatusListener = new BehaviorSubject<boolean>(false);
  public nameUpdated = new BehaviorSubject<string | null>('');
  public roleUpdated = new BehaviorSubject<string | null>('');
  public emailUpdated = new BehaviorSubject<string | null>('');
  private isAuthenticated = false;
  private name: string | null = '';
  private role: string | null = '';
  private email: string | null = '';
  private authUrl = 'http://localhost:8080/auth/realms/demo';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private oidcSecurityService: OidcSecurityService
  ) {
    this.configurations = this.oidcSecurityService.getConfigurations();

    this.checkCookie();
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  getName(): string | null {
    return this.name;
  }

  getNameListener(): Observable<string | null> {
    return this.nameUpdated.asObservable();
  }

  getRole(): string | null {
    return this.role;
  }

  getRoleListener(): Observable<string | null> {
    return this.roleUpdated.asObservable();
  }

  getEmail(): string | null {
    return this.email;
  }

  getEmailListener(): Observable<string | null> {
    return this.emailUpdated.asObservable();
  }

  setEmailListener(email: string) {
    this.email = email;
    this.emailUpdated.next(email);
  }

  CreateUser(email: string, password: string, name: string) {
    const registerData: AuthDataRegister = {
      email: email,
      password: password,
      name: name,
    };
    return this.httpClient.post(environment.auth.register, registerData);
  }

  LoginUser(email: string, password: string) {
    const body = {
      grant_type: 'password',
      client_id: 'angular',
      client_secret: 's2UV05MWYLWBFTQNzacDQmWWGkEVlc22',
      username: email,
      password: password,
    };

    return this.httpClient.post<Login>(environment.auth.login, body, {
      headers: this.getHeaders(),
    });
  }

  Logout() {
    this.clearAuthData();
  }

  saveCookie(
    userId: string,
    token: string,
    expirationDate: string,
    name: string,
    role: string,
    email: string
  ) {
    this.cookieService.set('token', token, new Date(expirationDate));
    this.cookieService.set('userId', userId, new Date(expirationDate));
    this.cookieService.set('name', name, new Date(expirationDate));
    this.cookieService.set('role', role, new Date(expirationDate));
    this.cookieService.set('email', email, new Date(expirationDate));

    this.updateAuthData(true, name, role, email);
  }

  private clearAuthData() {
    this.cookieService.delete('token');
    this.cookieService.delete('userId');
    this.cookieService.delete('name');
    this.cookieService.delete('role');
    this.cookieService.delete('email');

    this.updateAuthData(false, null, null, null);
  }

  private updateAuthData(
    isAuth: boolean,
    name: string | null,
    role: string | null,
    email: string | null
  ) {
    this.isAuthenticated = isAuth;
    this.name = name;
    this.role = role;
    this.email = email;
    this.authStatusListener.next(isAuth);
    this.nameUpdated.next(name);
    this.roleUpdated.next(role);
  }

  existsToken() {
    const token: string = this.cookieService.get('token');
    if (!token) {
      return null;
    } else {
      return token;
    }
  }

  private checkCookie() {
    const token = this.existsToken();
    if (token) {
      const name = this.cookieService.get('name');
      const role = this.cookieService.get('role');
      const email = this.cookieService.get('email');
      this.updateAuthData(true, name, role, email);
    } else {
      this.clearAuthData();
    }
  }

  private getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  public getToken() {
    const token = this.oidcSecurityService.getAccessToken();
    return token;
  }

  private appendAuthHeader(headers: HttpHeaders) {
    const token = this.oidcSecurityService.getAccessToken();

    if (token === '') {
      return headers;
    }

    const tokenValue =
      'Bearer ' +
      'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3bXd5RzFfRHo4NF9ZX3Nwcm81N1dTd3dWTElERTBsZ25lQ3ZINXR6VlhNIn0.eyJleHAiOjE2ODg3MTI1OTIsImlhdCI6MTY4ODcxMjI5MiwianRpIjoiOWI1OThmZDItOWQ4Yi00ZTcxLTg0ZDgtODkyYjQ1OGQ3YzU0IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL2RlbW8iLCJzdWIiOiJlMjYyZjhlYS03OTFkLTQ2MTEtOWJjNS03ZGMwNTUzMDhjZTgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhbmd1bGFyIiwic2Vzc2lvbl9zdGF0ZSI6ImU4NTU0NmI1LTMzZjQtNGIzZC05OGMzLWViMTJlMjZhMGFjMyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo0MjAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImFwcC1hZG1pbiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYW5ndWxhciI6eyJyb2xlcyI6WyJhZG1pbiJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImU4NTU0NmI1LTMzZjQtNGIzZC05OGMzLWViMTJlMjZhMGFjMyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6ImFkbWluIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW5AZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifQ.Tyyj5JoBt974zTxtuoPHIus-eK_jdKTknK2n6l6cq6oisoiDjgB1ufEK_XRhhfBVFoNOVqtOqbzZMHQnAbgrihc67c932n4ArwdI6i99RPh1JhT3x13b4cFBgnkRw0Ql9ST-Rc2vMwYdokFok9btaVEOmZ7uNz-WoRjV5MXFs-0tw4u5wtkXt37eEkkMvrkkjFFQJeF84QgNEcnWNd4ZNK1UCmzi8eFJBAP8zBa90H7UZoT5U91MsQMx9sQWDRR1jsIeCv5dirydBHJlhwSoNpBi9FXJHlb8ahPR9LaaKa6AHPx_XSVR2y9S58kY6F9Lqa-AZnXXWjyKDU5r2YawCg';
    return headers.set('Authorization', tokenValue);
  }
}
