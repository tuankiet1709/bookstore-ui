import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthData, AuthDataRegister, Login } from '../../models';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authStatusListener = new BehaviorSubject<boolean>(false);
  public nameUpdated = new BehaviorSubject<string | null>('');
  public roleUpdated = new BehaviorSubject<string | null>('');
  public emailUpdated = new BehaviorSubject<string | null>('');
  private isAuthenticated = false;
  private name: string | null = '';
  private role: string | null = '';
  private email: string | null = '';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
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
    return this.httpClient.post<Login>(environment.auth.login, {
      grant_type: 'password',
      client_id: 'angular',
      client_secret: 'emjN9ReYZyWDB7IwRwO8eLhFbxG4DeQk',
      username: email,
      password: password,
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
}
