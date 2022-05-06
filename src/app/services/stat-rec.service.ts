import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/reclamation-model';
import { Datestat } from '../models/date-model';

@Injectable({
  providedIn: 'root'
})
export class StatRecService {

  _url='http://localhost:3000/api/statRec/getNbAccueil'
  url_prix='http://localhost:3000/api/statRec/getNbPrix'
  url_qualité='http://localhost:3000/api/statRec/getNbQualite'
  url_personnel='http://localhost:3000/api/statRec/getNbPersonel'
  url_mois='http://localhost:3000/api/statRec/getNbRecParMoix'

  constructor(private http:HttpClient) { }

  Getreclamation(date:Datestat):Observable<any>{
    return this.http.post<Datestat>(`${this._url}`,date);
  }

  GetRecPrix(date:Datestat):Observable<any>{
    return this.http.post<Datestat>(`${this.url_prix}`,date);
  }

  GetRecQualité(date:Datestat):Observable<any>{
    return this.http.post<Datestat>(`${this.url_qualité}`,date);
  }

  GetRecPersonnel(date:Datestat):Observable<any>{
    return this.http.post<Datestat>(`${this.url_personnel}`,date);
  }

  GetRecMois(date:Datestat):Observable<any>{
    return this.http.post<Datestat>(`${this.url_mois}`,date);
  }
}
