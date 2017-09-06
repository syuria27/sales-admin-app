import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Order } from '../models/order';
import { Sales } from '../models/sales';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class OrderService {
  private apiUrl = 'http://npspgmanagement.co.id:3003/api/order';

  constructor(private http: Http, private auth: AuthService) { }

  /**
    * Get Daily Order
    */
    getDailyOrder(tanggal: string): Observable<Order[]> {
      const sales: Sales = this.auth.getUserInfo();
     return this.http.get(`${this.apiUrl}/${sales.depot}/${tanggal}`)
      .map(res => res.json().order)
      .catch(this.handleError);
   }

   /**
    * Get Daily Order
    */
    getOrderDetail(kode_order: string): Observable<Order> {
     return this.http.get(`${this.apiUrl}/${kode_order}`)
      .map(res => res.json().order)
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
