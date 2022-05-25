import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/reclamation-model';
import { Datestat } from '../models/date-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatRecService {

  _url=environment.Api +'api/statRec/getNbAccueil'
  url_prix=environment.Api +'api/statRec/getNbPrix'
  url_qualité=environment.Api +'api/statRec/getNbQualite'
  url_personnel=environment.Api +'api/statRec/getNbPersonel'
  url_mois=environment.Api +'api/statRec/getNbRecParMoix'
  url_boutique=environment.Api +'api/statRec/getNbRecParBoutique'

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

  GetRecBoutique(date:Datestat):Observable<any>{
    return this.http.post<Datestat>(`${this.url_boutique}`,date);
  }
}
