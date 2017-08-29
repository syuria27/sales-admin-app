import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private apiUrl = 'http://npspgmanagement.co.id:3003/api/user';

  constructor(private http: Http) { }

  /**
   * Get All User
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get(`${this.apiUrl}s`)
      .map(res => res.json().users)
      .map(users => {
        return users.map(user => {
          let status: string;
          if (user.status === 1) {
            status = 'AKTIF';
          } else {
            status = 'NON AKTIF';
          }
          return{
            kode_sales : user.kode_sales,
            kode_sap : user.kode_sap,
            nama_sales : user.nama_sales,
            depot : user.depot,
            status : status
          };
        });
      })
      .catch(this.handleError);
  }

  /**
   * Create User
   */
  createUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, user)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Update User
   */
  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, user)
    .map(res => res.json())
    .catch(this.handleError);
  }

  /**
   * Update Password
   */
  updatePassword(kode_sales: string, password: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/password`, {kode_sales, password})
    .map(res => res.json())
    .catch(this.handleError);
  }

  /**
   * Update Status
   */
  updateStatus(kode_sales: string, status: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/status`, {kode_sales, status})
    .map(res => res.json())
    .catch(this.handleError);
  }


  /**
    * Get User
    */
  getUser(kode_sales: string): Observable<User> {
      return this.http.get(`${this.apiUrl}/${kode_sales}`)
        .map(res => res.json().user)
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
