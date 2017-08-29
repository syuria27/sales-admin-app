import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './components/page-404/page-404.component';
import { HomeComponent } from './components/home/home.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { NotifComponent } from './components/notif/notif.component';

import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'upload', component: UploadFileComponent, canActivate: [AdminGuard] },
      { path: 'notif', component: NotifComponent, canActivate: [AdminGuard] },
      { path: '**', pathMatch: 'full', component: Page404Component }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
