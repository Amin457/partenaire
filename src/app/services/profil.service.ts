import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partenaire } from '../models/partenaire_model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  _url= environment.Api + 'api/partenaires/';
  baseURL=environment.Api+"api/admin/";

  constructor(private http: HttpClient) { }

  UpdateProfil(partenaire:Partenaire): Observable<any> {
    return this.http.patch<Partenaire>(`${this._url}` + `updatePart`,partenaire);
  }

  getPartenaireById (id_part : number):Observable<any>{
    return this.http.get<Partenaire>(`${this.baseURL}`+'getPartenaireById/'+id_part);
  }
}
