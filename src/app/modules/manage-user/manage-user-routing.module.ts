import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUserComponent } from './manage-user.component';
import { InputUserComponent } from './input-user/input-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AdminGuard } from '../../guards/admin.guard';

const routes: Routes = [
  { path: 'manage-user',
    component: ManageUserComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list-user' },
      { path: 'list-user', component: ListUserComponent },
      { path: 'input-user', component: InputUserComponent },
      { path: 'edit-user/:kode_sales', component: EditUserComponent }
    ],
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }
