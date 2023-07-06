import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../shared/services';
import { AuthConfigModule } from './auth-config.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    AuthConfigModule,
    CommonModule,
    SharedModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true,
    }),
  ],
})
export class AuthModule {}
