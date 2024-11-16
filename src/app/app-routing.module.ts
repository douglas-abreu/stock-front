import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product/form/product.component';
import { LoginComponent } from './login/login.component';
import { loginGuard } from './shared/guards/login.guard';
import { UserComponent } from './user/forms/add-user/user.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { CategoryComponent } from './category/form/category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'list-product',
    component: ListProductComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'list-category',
    component: ListCategoryComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [loginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
