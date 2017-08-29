import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Visit } from '../models/visit';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VisitService {
  private apiUrl = 'http://npspgmanagement.co.id:3003/api/visit';

  constructor(private http: Http) { }

  /**
    * Get Daily Visit
    */
  getSalesVisit(kode_sales: string, tanggal: string): Observable<Visit[]> {
    return this.http.get(`${this.apiUrl}/${kode_sales}/${tanggal}`)
      .map(res => res.json().visit)
      .map(visit => {
        return visit.map(vst => {
          return{
            kode_visit : vst.kode_visit,
            selfie_masuk : `<img src="http://npspgmanagement.co.id:3002/selfie/${vst.kode_visit}-M.jpeg" alt="X" width="90" height="90" class="img-rounded"/>`,
            selfie_pulang : `<img src="http://npspgmanagement.co.id:3002/selfie/${vst.kode_visit}-P.jpeg" alt="X" width="90" height="90" class="img-rounded"/>`,
            tanggal : vst.tanggal,
            nama_toko : vst.nama_toko,
            jam_masuk : vst.jam_masuk,
            lokasi_masuk : vst.lokasi_masuk,
            jam_pulang : vst.jam_pulang,
            lokasi_pulang : vst.lokasi_pulang,
            selisih : vst.selisih
          };
        });
      })
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
