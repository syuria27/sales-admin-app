import { Component, OnInit } from '@angular/core';
import { NotifService } from './../../services/notif.service';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styles: []
})
export class NotifComponent implements OnInit {

  notif = {
    judul: '',
    short_desc: '',
    description: ''
  };
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private notifService: NotifService) { }

  ngOnInit() {
  }

  pushNotif() {
    this.loading = true;
    this.notifService.pushNotif(this.notif)
      .subscribe(msg => {
        this.notif = {
          judul : '',
          short_desc: '',
          description: ''
        };
        this.successMessage = msg.error_msg;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.errorMessage = err;
        this.loading = false;
      }
    );
  }

}
