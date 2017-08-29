import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Sales } from './../models/sales';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class SalesService {

  private apiUrl = 'http://npspgmanagement.co.id:3003/api/sales';

  constructor(private http: Http, private auth: AuthService) { }

  /**
   * Get All Sales
   */
   getAllSales(): Observable<Sales[]> {
     const sales: Sales = this.auth.getUserInfo();
     return this.http.get(`${this.apiUrl}/${sales.depot}`)
      .map(res => res.json().sales)
      .catch(this.handleError);
   }

   /**
    * Get Sales
    */
    getSales(kode_sales: string): Observable<Sales> {
      const sales: Sales = this.auth.getUserInfo();
      return this.http.get(`${this.apiUrl}/${sales.depot}/${kode_sales}`)
        .map(res => res.json().sales)
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
