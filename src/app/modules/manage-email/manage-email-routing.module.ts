import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageEmailComponent } from './manage-email.component';
import { ListEmailComponent } from './list-email/list-email.component';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { CreateEmailComponent } from './create-email/create-email.component';
import { AdminGuard } from './../../guards/admin.guard';

const routes: Routes = [
  { path: 'manage-email',
    component: ManageEmailComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list-email' },
      { path: 'list-email', component: ListEmailComponent },
      { path: 'create-email', component: CreateEmailComponent },
      { path: 'edit-email/:depot', component: EditEmailComponent }
    ],
    canActivate: [AdminGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageEmailRoutingModule { }
