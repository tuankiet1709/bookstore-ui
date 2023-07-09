import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full',
  },
  {
    path: 'books',
    loadChildren: () => import('./book/book.module').then((m) => m.BookModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'unauthorized',
    loadChildren: () =>
      import('./auth/auth-config.module').then((m) => m.AuthConfigModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
