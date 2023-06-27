import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookManagementComponent } from './book-management/book-management.component';
import { BookListAdminComponent } from './book-management/book-list-admin/book-list-admin.component';
import { BookCreateComponent } from './book-management/book-create/book-create.component';
import { AuthGuard } from '../shared/services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BookListComponent,
  },
  {
    path: 'management',
    component: BookManagementComponent,
    children: [
      {
        path: 'book-list',
        pathMatch: 'full',
        component: BookListAdminComponent,
      },
      {
        path: 'book-create',
        pathMatch: 'full',
        component: BookCreateComponent,
      },
      {
        path: 'book-create/:id/edit',
        pathMatch: 'full',
        component: BookCreateComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: BookDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
