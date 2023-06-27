import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CartService } from 'src/app/shared/services';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  const mockAuthService = {
    getAuthStatusListener: () => {
      return of(true);
    },
    getNameListener: () => {
      return of('name');
    },
    getRoleListener: () => {
      return of('name');
    },
    getName: () => {
      return 'name';
    },
    getIsAuth: () => {
      return true;
    },
    Logout: jasmine.createSpy('Logout').and.returnValue(of({})),
  };

  const mockCartService = {
    getAmountListener: () => {
      return of(1);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientModule, SharedModule, RouterTestingModule],
      providers: [
        CookieService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Logout successfully', () => {
    spyOn(router, 'navigate');
    component.onLogout();
    expect(router.navigate).toHaveBeenCalled();
  });
});
