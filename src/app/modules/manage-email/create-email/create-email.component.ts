import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../../services/email.service';
import { Email } from '../../../models/email';

@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.component.html',
  styles: []
})
export class CreateEmailComponent implements OnInit {
  loading = false;
  alerts: any = [];
  email: Email = {
    depot: '',
    email: ''
  };

  constructor(private emailService: EmailService) { }

  ngOnInit() {
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

  createEmail() {
    this.loading = true;
    this.emailService.createEmail(this.email.depot, this.email.email)
      .subscribe(msg => {
        this.email.depot = '';
        this.email.email = '';
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
