import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BookRoutingModule } from './book-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BookListAdminComponent } from './book-management/book-list-admin/book-list-admin.component';
import { BookManagementComponent } from './book-management/book-management.component';
import { BookCreateComponent } from './book-management/book-create/book-create.component';

import { BookFilterComponent } from './book-list/book-filter/book-filter.component';
import { InMemoryDataService } from '../shared/services';
import {
  CURRENCY_MASK_CONFIG,
  CurrencyMaskConfig,
  CurrencyMaskModule,
} from 'ng2-currency-mask';
import { NgxPaginationModule } from 'ngx-pagination';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  decimal: ',',
  precision: 0,
  prefix: '',
  suffix: ' VND',
  thousands: ',',
};

@NgModule({
  declarations: [
    BookListComponent,
    BookItemComponent,
    BookDetailComponent,
    BookListAdminComponent,
    BookManagementComponent,
    BookCreateComponent,
    BookFilterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BookRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true,
    }),
    CurrencyMaskModule,
    NgxPaginationModule,
  ],
  providers: [
    CurrencyPipe,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
  ],
})
export class BookModule {}
