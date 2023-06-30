import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  Loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService
      .CreateUser(form.value.email, form.value.password, form.value.name)
      .subscribe((res) => {
        this.tabGroup.selectedIndex = 0;
      });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService
      .LoginUser(form.value.emailLogin, form.value.passwordLogin)
      .subscribe((res: Login) => {
        console.log('login successful');
        this.authService.saveCookie(
          res.userId,
          res.token,
          res.expireAt,
          res.name,
          res.role,
          form.value.emailLogin
        );
        this.authService.setEmailListener(form.value.emailLogin);
        if (res.role == 'admin') {
          this.router.navigate(['/books/management/book-list']);
        } else {
          this.router.navigate(['/books']);
        }
      });
  }
}
