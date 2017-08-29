import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesListComponent } from './sales-list/sales-list.component';
import { ReportSalesComponent } from './report-sales.component';
import { VisitSalesComponent } from './visit-sales/visit-sales.component';
import { CrmSalesComponent } from './crm-sales/crm-sales.component';
import { RptSalesComponent } from './rpt-sales/rpt-sales.component';


import { AuthGuard } from '../../guards/auth.guard';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const routes: Routes = [
  { path: 'report-sales',
    component: ReportSalesComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'sales-list' },
      { path: 'sales-list', component: SalesListComponent },
      { path: 'visit/:kode_sales', component: VisitSalesComponent },
      { path: 'crm/:kode_sales', component: CrmSalesComponent },
      { path: 'rpt/:kode_sales', component: RptSalesComponent },
   ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportSalesRoutingModule { }
