import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Email } from '../models/email';
import { Sales } from '../models/sales';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class EmailService {
  private apiUrl = 'http://npspgmanagement.co.id:3003/api/email';

  constructor(private http: Http, private auth: AuthService) { }

  /**
   * Get All Email
   */
  getAllEmails(): Observable<Email[]> {
    return this.http.get(`${this.apiUrl}s`)
      .map(res => res.json().emails)
      .catch(this.handleError);
  }

  /**
   * Create Email
   */
  createEmail(depot: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, {depot, email})
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Update Email
   */
  updateEmail(depot: string, email: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, {depot, email})
    .map(res => res.json())
    .catch(this.handleError);
  }

  /**
    * Get Email
    */
    getEmail(depot: string): Observable<Email> {
      return this.http.get(`${this.apiUrl}/${depot}`)
        .map(res => res.json().email)
        .catch(this.handleError);
  }

  /**
    * Handle any error from the API
    */
  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      const body = err.json() || '';
      const error = JSON.stringify(body.error_msg);
      errMessage = `${err.status} - ${error}`;
    }else {
      errMessage = err.message ? err.message : err.toString();
    }
      return Observable.throw(errMessage);
  }

}
