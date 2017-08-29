import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SpinnerModule } from 'angular2-spinner/dist';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule, AlertModule } from 'ngx-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';


import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesService } from '../../services/sales.service';

import { ReportSalesRoutingModule } from './report-sales-routing.module';
import { ReportSalesComponent } from './report-sales.component';
import { VisitSalesComponent } from './visit-sales/visit-sales.component';
import { CrmSalesComponent } from './crm-sales/crm-sales.component';

import { VisitService } from '../../services/visit.service';
import { CrmService } from '../../services/crm.service';
import { RptService } from '../../services/rpt.service';
import { RptSalesComponent } from './rpt-sales/rpt-sales.component';

@NgModule({
  imports: [
    MyDatePickerModule,
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
    VisitSalesComponent,
    CrmSalesComponent,
    RptSalesComponent,
  ],
  providers: [SalesService, VisitService, CrmService, RptService]
})
export class ReportSalesModule { }
