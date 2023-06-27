import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Login } from 'src/app/shared/models';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(() => {
    const mockTabGroup = {
      selectedIndex: 0,
    };

    const authService = {
      CreateUser: () => {
        return of({});
      },
      LoginUser: (email: string, password: string) => {
        if (email == 'admin@gmail.com') {
          console.log('admin');
          return of({
            userId: 1,
            token: 'abc',
            expireAt: 100,
            name: 'name',
            role: 'admin',
          });
        } else {
          console.log('client');
          return of({
            userId: 1,
            token: 'abc',
            expireAt: 100,
            name: 'name',
            role: 'client',
          });
        }
      },
      saveCookie: () => {
        return of({});
      },
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, SharedModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: MatTabGroup, useValue: mockTabGroup },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    const tabGroupSpy = jasmine.createSpyObj('MatTabGroup', ['methodName']);
    component.tabGroup = tabGroupSpy;
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('onSignup', () => {
    it('should call AuthService CreateUser method and select first tab', () => {
      const formValue = {
        email: 'test@example.com',
        password: 'password',
        name: 'John',
      };
      const form = { invalid: false, value: formValue } as NgForm;

      component.onSignup(form);

      expect(component.tabGroup.selectedIndex).toBe(0);
    });
  });

  describe('onLogin', () => {
    it('should call AuthService LoginUser method and navigate to appropriate route', () => {
      spyOn(router, 'navigate');
      const formValue = {
        emailLogin: 'admin@gmail.com',
        passwordLogin: 'password',
      };
      const form = { invalid: false, value: formValue } as NgForm;
      component.onLogin(form);

      expect(router.navigate).toHaveBeenCalledWith([
        '/books/management/book-list',
      ]);
    });

    it('should call AuthService LoginUser method and navigate to appropriate route to /books', () => {
      spyOn(router, 'navigate');
      const formValue = {
        emailLogin: 'client@gmail.com',
        passwordLogin: 'password',
      };
      const form = { invalid: false, value: formValue } as NgForm;
      component.onLogin(form);

      expect(router.navigate).toHaveBeenCalledWith(['/books']);
    });

    it('should not call AuthService LoginUser method if form is invalid', () => {
      const form = { invalid: true } as NgForm;
      spyOn(router, 'navigate');

      component.onLogin(form);

      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
