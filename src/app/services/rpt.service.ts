import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Report } from '../models/report';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RptService {
  private apiUrl = 'http://npspgmanagement.co.id:3003/api/report';

  constructor(private http: Http) { }

  /**
    * Get Daily Report
    */
  getSalesReport(kode_sales: string, bulan: number, tahun: number): Observable<Report[]> {
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
