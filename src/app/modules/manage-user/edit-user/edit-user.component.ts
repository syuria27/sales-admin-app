import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: []
})
export class EditUserComponent implements OnInit {
  password = '';

  hak_akses = [
    {value: 1, display: 'User'},
    {value: 2, display: 'Admin'}
  ];

  user: User = {
    nama_sales : '',
    depot: '',
    hak_akses: this.hak_akses[0].value
  };

  loading = false;
  loadingUser = false;
  errorMessage = '';
  errorUpdate = '';
  successUpdate = '';


  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();
  }

  updateData() {
    this.loading = true;
    this.userService.updateUser(this.user)
      .subscribe(
        data => {
          console.log(data);
          this.successUpdate = data.error_msg;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.errorUpdate = err;
          this.loading = false;
        }
      );
  }

  updatePassword() {
    this.loading = true;
    this.userService.updatePassword(this.user.kode_sales, this.password)
      .subscribe(
        data => {
          console.log(data);
          this.successUpdate = data.error_msg;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.errorUpdate = err;
          this.loading = false;
        }
      );
  }

  nonActive() {
    this.loading = true;
    this.userService.updateStatus(this.user.kode_sales, 0)
      .subscribe(
        data => {
          console.log(data);
          this.user.status = 0;
          this.successUpdate = data.error_msg;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.errorUpdate = err;
          this.loading = false;
        }
      );
  }

  active() {
    this.loading = true;
    this.userService.updateStatus(this.user.kode_sales, 1)
      .subscribe(
        data => {
          console.log(data);
          this.user.status = 1;
          this.successUpdate = data.error_msg;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.errorUpdate = err;
          this.loading = false;
        }
      );
  }

  getUser() {
    this.loadingUser = true;
    const kode_sales = this.route.snapshot.params['kode_sales'];
    this.userService.getUser(kode_sales)
      .subscribe(
        sales => {
          console.log(sales);
          this.user = sales;
          this.loadingUser = false;
        }, error => {
           this.errorMessage = error;
           this.loadingUser = false;
        }
      );
  }

}
