import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ProductlistComponent } from './pages/productlist/productlist.component';
import { ProductdetailComponent } from './pages/productdetail/productdetail.component';
import { ProductRecommedOutOfStockComponent } from './pages/product-recommed-out-of-stock/product-recommed-out-of-stock.component';
import { ProductOutOfStockComponent } from './pages/product-out-of-stock/product-out-of-stock.component';
import { OpenOrderPageComponent } from './pages/open-order-page/open-order-page.component';
import { InprogressOrderPageComponent } from './pages/inprogress-order-page/inprogress-order-page.component';
import { HistoryOrderPageComponent } from './pages/history-order-page/history-order-page.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'addproduct', component: AddProductComponent },
      { path: 'productlist', component: ProductlistComponent },
      { path: 'product/:id', component: ProductdetailComponent },
      {
        path: 'recommedoutofstock',
        component: ProductRecommedOutOfStockComponent,
      },
      { path: 'outofstock', component: ProductOutOfStockComponent },
      {
        path: 'order',
        children: [
          {
            path: 'open',
            component: OpenOrderPageComponent,
          },
          {
            path: 'inprogress',
            component: InprogressOrderPageComponent,
          },
          {
            path: 'history',
            component: HistoryOrderPageComponent,
          },
          {
            path: 'detail/:id',
            component: OrderDetailComponent,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'list',
            component: UserListComponent,
          },
          {
            path: 'detail/:id',
            component: UserDetailComponent,
          },
        ],
      },
    ],
  },

  {
    path: '**',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
