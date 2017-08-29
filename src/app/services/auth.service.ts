import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Sales } from '../models/sales';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private authUrl = 'http://npspgmanagement.co.id:3003/api/login';
  private loggedIn = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('userInfo');
  }

  sudahLogin(): boolean {
    return this.loggedIn;
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) {
      if (user.hak_akses === 3) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  login(username: string, password: string): Observable<Sales> {
    return this.http.post(this.authUrl, {username, password})
      .map(res => res.json().user)
      .do(res => {
          localStorage.setItem('userInfo', JSON.stringify(res));
          this.loggedIn = true;
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('userInfo');
    this.loggedIn = false;
  }

  getUserInfo(): Sales {
    return JSON.parse(localStorage.getItem('userInfo'));
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
