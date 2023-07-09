import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UnauthorizedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
