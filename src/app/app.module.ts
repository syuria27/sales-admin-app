import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SpinnerModule } from 'angular2-spinner/dist';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule, AlertModule, BsDropdownModule, ProgressbarModule } from 'ngx-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { FileUploadModule } from 'ng2-file-upload';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

import { ManageUserModule } from './modules/manage-user/manage-user.module';
import { ReportSalesModule } from './modules/report-sales/report-sales.module';
import { ManageProductModule } from './modules/manage-product/manage-product.module';
import { ManageEmailModule } from './modules/manage-email/manage-email.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Page404Component } from './components/page-404/page-404.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { NotifComponent } from './components/notif/notif.component';
import { NotifService } from './services/notif.service';
import { OrderComponent } from './components/order/order.component';
import { OrderService } from './services/order.service';
import { OrderGuard } from './guards/order.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Page404Component,
    HomeComponent,
    UploadFileComponent,
    NotifComponent,
    OrderComponent
  ],
  imports: [
    ManageUserModule,
    ReportSalesModule,
    ManageProductModule,
    ManageEmailModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2TableModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    SpinnerModule,
    MyDatePickerModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    FileUploadModule
  ],
  providers: [AuthService, AuthGuard, AdminGuard, NotifService, OrderService, OrderGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
