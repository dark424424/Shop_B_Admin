import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { AuthInterceptorProvider } from './interceptor/auth.interceptor';

// Editor
import { NgxEditorModule } from 'ngx-editor';

// Material  UI
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

// Angular Module
import { ReactiveFormsModule } from '@angular/forms';

// Ngrx Store
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Chart
import { ChartModule } from 'angular-highcharts';
// Moment
import { MomentModule } from 'ngx-moment';

// Component
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { TopbarComponent } from './component/topbar/topbar.component';
import { FeatureInfoComponent } from './component/feature-info/feature-info.component';
import { ChartComponent } from './component/chart/chart.component';
import { LoginComponent } from './pages/login/login.component';
import { localStorageSync } from 'ngrx-store-localstorage';
import { userReducer } from './store/user-store/user.store.reducer';
import { LoadingPopupComponent } from './common/pop-up/loading-popup/loading-popup.component';
import { ErrorPopupComponent } from './common/pop-up/error-popup/error-popup.component';
import { SuccessPopupComponent } from './common/pop-up/success-popup/success-popup.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ProductlistComponent } from './pages/productlist/productlist.component';
import { PagingComponent } from './component/paging/paging.component';
import { ProductdetailComponent } from './pages/productdetail/productdetail.component';
import { AddProductPopupComponent } from './common/pop-up/add-product-popup/add-product-popup.component';
import { ProductOutOfStockComponent } from './pages/product-out-of-stock/product-out-of-stock.component';
import { ProductRecommedOutOfStockComponent } from './pages/product-recommed-out-of-stock/product-recommed-out-of-stock.component';
import { OpenOrderPageComponent } from './pages/open-order-page/open-order-page.component';
import { InprogressOrderPageComponent } from './pages/inprogress-order-page/inprogress-order-page.component';
import { HistoryOrderPageComponent } from './pages/history-order-page/history-order-page.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { ReasonCancelComponent } from './common/pop-up/reason-cancel/reason-cancel.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserListComponent } from './pages/user-list/user-list.component';

registerLocaleData(en);

export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: ['userStore'],
    rehydrate: true,
  })(reducer);
}

const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    // Component
    SidebarComponent,
    TopbarComponent,
    FeatureInfoComponent,
    ChartComponent,
    PagingComponent,
    // Page
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    ProductlistComponent,
    AddProductComponent,
    ProductdetailComponent,
    ProductOutOfStockComponent,
    ProductRecommedOutOfStockComponent,
    OpenOrderPageComponent,
    InprogressOrderPageComponent,
    HistoryOrderPageComponent,
    OrderDetailComponent,
    UserDetailComponent,
    UserListComponent,
    // Popup
    LoadingPopupComponent,
    ErrorPopupComponent,
    SuccessPopupComponent,
    AddProductPopupComponent,
    ReasonCancelComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    FormsModule,
    HttpClientModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    BrowserAnimationsModule,
    MomentModule,
    // Material UI
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    // Angular Core
    ReactiveFormsModule,
    // Chart
    ChartModule,
    //
    NgxEditorModule,
    // Ngrx store
    StoreModule.forRoot({}),
    StoreModule.forFeature('userStore', userReducer),
    // StoreModule.forFeature('cart', cartReducer),
    // StoreModule.forFeature('searchStore', searchReducer),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, AuthInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
