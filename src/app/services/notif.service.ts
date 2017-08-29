import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotifService {

  private apiUrl = 'http://npspgmanagement.co.id:3003/api/fcm';

  constructor(private http: Http) { }

  /**
   * Push Notif
   */
  pushNotif(notif: any): Observable<any> {
    return this.http.post(this.apiUrl, notif)
      .map(res => res.json())
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
    } else {
      errMessage = err.message ? err.message : err.toString();
    }
    return Observable.throw(errMessage);
  }

}
