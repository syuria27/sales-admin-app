import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CRM } from '../models/crm';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CrmService {
  private apiUrl = 'http://npspgmanagement.co.id:3003/api/crm';

  constructor(private http: Http) { }

  /**
    * Get Daily CRM
    */
  getSalesCRM(kode_sales: string, bulan: number, tahun: number): Observable<CRM[]> {
    return this.http.get(`${this.apiUrl}/${kode_sales}/${bulan}/${tahun}`)
      .map(res => res.json().crm)
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
