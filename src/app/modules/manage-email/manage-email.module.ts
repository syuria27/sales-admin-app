import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SpinnerModule } from 'angular2-spinner/dist';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule, AlertModule } from 'ngx-bootstrap';

import { ManageEmailRoutingModule } from './manage-email-routing.module';
import { ManageEmailComponent } from './manage-email.component';
import { ListEmailComponent } from './list-email/list-email.component';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { CreateEmailComponent } from './create-email/create-email.component';
import { EmailService } from '../../services/email.service';
import { AdminGuard } from './../../guards/admin.guard';
import { AuthService } from '../../services/auth.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@NgModule({
  imports: [
    Ng2TableModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    SpinnerModule,
    FormsModule,
    CommonModule,
    ManageEmailRoutingModule
  ],
  declarations: [ManageEmailComponent, ListEmailComponent, EditEmailComponent, CreateEmailComponent],
  providers: [EmailService, AdminGuard, AuthService]
})
export class ManageEmailModule { }
