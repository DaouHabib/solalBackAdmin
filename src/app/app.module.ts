import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardModule } from './components/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './components/products/products.module';
import { SalesModule } from './components/sales/sales.module';
import { CouponsModule } from './components/coupons/coupons.module';
import { PagesModule } from './components/pages/pages.module';
import { MediaModule } from './components/media/media.module';
import { MenusModule } from './components/menus/menus.module';
import { VendorsModule } from './components/vendors/vendors.module';
import { UsersModule } from './components/users/users.module';
import { LocalizationModule } from './components/localization/localization.module';
import { InvoiceModule } from './components/invoice/invoice.module';
import { SettingModule } from './components/setting/setting.module';;
import { ReportsModule } from './components/reports/reports.module';
import { AuthModule } from './components/auth/auth.module';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { categoryDB } from './shared/tables/category';
import { productDB } from './shared/tables/product-list';
import { digitalCategoryDB } from './shared/tables/digital-category';
import { digitalSubCategoryDB } from './shared/tables/digital-sub-category';
import { reportDB } from './shared/tables/report';
import { userListDB } from './shared/tables/list-users';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './shared/service/user.service';
import { AuthenticationService } from './shared/service/authentication.service';
import { Champservice } from './shared/service/champ.service';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from './core/core.module';
import { ShowAnimationComponent } from './components/animate-image/show-animation/show-animation.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { NftComponent } from './components/nft/nft.component';


@NgModule({
  declarations: [
    AppComponent,
    ShowAnimationComponent,
    NftComponent,
  ],
  imports: [
    FontAwesomeModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    DashboardModule,
    InvoiceModule,
    SettingModule,
    ReportsModule,
    AuthModule,
    CoreModule,
    SharedModule,
    LocalizationModule,
    ProductsModule,
    SalesModule,
    VendorsModule,
    CouponsModule,
    PagesModule,
    MediaModule,
    MenusModule,
    UsersModule,
    HttpClientModule 

  ],
  providers: [UserService,AuthenticationService,Champservice],
  exports:[],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
