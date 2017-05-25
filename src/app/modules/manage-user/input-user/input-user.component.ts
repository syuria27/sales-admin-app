import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user';

@Component({
  selector: 'app-input-user',
  templateUrl: './input-user.component.html',
  styles: []
})
export class InputUserComponent implements OnInit {
  user: User;
  loading = false;
  alerts: any = [];

  hak_akses = [
    {value: 1, display: 'User'},
    {value: 2, display: 'Admin'}
  ];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = {
      nama_sales : '',
      depot: '',
      hak_akses: this.hak_akses[0].value
    };
  }

  showAlertSuccess(resp: string): void {
    this.alerts.push({
      type: 'success',
      msg: resp,
      timeout: 5000
    });
  }

  showAlertError(resp: string): void {
    this.alerts.push({
      type: 'danger',
      msg: resp,
      timeout: 5000
    });
  }

  createUser() {
    this.loading = true;
    this.userService.createUser(this.user)
      .subscribe(msg => {
        this.user = {
          nama_sales : '',
          depot: '',
          hak_akses: this.hak_akses[0].value
        };
        this.showAlertSuccess(msg.error_msg);
        this.loading = false;
      },
      err => {
        console.log(err);
        this.showAlertError(err);
        this.loading = false;
      }
    );
  }

}
