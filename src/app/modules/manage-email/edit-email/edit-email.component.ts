import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../../../services/email.service';
import { Email } from '../../../models/email';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styles: []
})
export class EditEmailComponent implements OnInit {
  email: Email = {
    depot: '',
    email: ''
  };
  loading = false;
  loadingEmail = false;
  errorMessage = '';
  errorUpdate = '';
  successUpdate = '';

  constructor(private emailService: EmailService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getEmail();
  }

  updateData() {
    this.loading = true;
    this.emailService.updateEmail(this.email.depot, this.email.email)
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

  getEmail() {
    this.loadingEmail = true;
    const depot = this.route.snapshot.params['depot'];
    this.emailService.getEmail(depot)
      .subscribe(
        prd => {
          console.log(prd);
          this.email = prd;
          this.loadingEmail = false;
        }, error => {
           this.errorMessage = error;
           this.loadingEmail = false;
        }
      );
  }
}
