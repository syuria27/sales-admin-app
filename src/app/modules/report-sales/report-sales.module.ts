import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SpinnerModule } from 'angular2-spinner/dist';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule, AlertModule } from 'ngx-bootstrap';

import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesService } from '../../services/sales.service';

import { ReportSalesRoutingModule } from './report-sales-routing.module';
import { ReportSalesComponent } from './report-sales.component';

@NgModule({
  imports: [
    Ng2TableModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    SpinnerModule,
    FormsModule,
    CommonModule,
    ReportSalesRoutingModule
  ],
  declarations: [
    SalesListComponent,
    ReportSalesComponent,
  ],
  providers: [SalesService]
})
export class ReportSalesModule { }
