import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesListComponent } from './sales-list/sales-list.component';
import { ReportSalesComponent } from './report-sales.component';
import { AuthGuard } from '../../guards/auth.guard';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const routes: Routes = [
  { path: 'report-sales',
    component: ReportSalesComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'sales-list' },
      { path: 'sales-list', component: SalesListComponent }
   ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportSalesRoutingModule { }
