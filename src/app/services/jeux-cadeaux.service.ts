import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cadeaux } from '../models/tab-cadeaux-model';
import { Gagnants } from '../models/gagnants';
import { environment } from 'src/environments/environment';
import { Datestat } from '../models/date-model';

@Injectable({
  providedIn: 'root'
})
export class JeuxCadeauxService {

  url=environment.Api +'api/cadeau/'
  url_add_gift=environment.Api +'api/cadeau/ajouterCadeau'
  url_delete_gift=environment.Api +'api/cadeau/'

  constructor (private http:HttpClient) { }

  GetCadeaux(id_part:number):Observable<any>{
    return this.http.get<Cadeaux>(`${this.url}`+id_part);
  }

  addCadeau(cadeau:any):Observable<any>{
    return this.http.post<any>(`${this.url_add_gift}`,cadeau);
  }

  DeleteCadeau(id_cadeau:number):Observable<any>{
    return this.http.patch<any>(`${this.url_delete_gift}/${id_cadeau}`,{});
  }

  getGagnants(id_part:number):Observable<any>{
    return this.http.get<Gagnants>(`${this.url}`+`getGagnants/`+id_part);
  }

  getEtatJeux(id_part:number):Observable<any>{
    return this.http.get<any>(`${this.url}`+`etat/`+id_part);
  }

  updateEtatJeux(id_part:number):Observable<any>{
    return this.http.patch<any>(`${this.url}`+`updateEtatJeux/`+id_part,{});
  }

  statSemaineGagnants(date:Datestat):Observable<any>{
    return this.http.post<Datestat>(`${this.url}`+'statSemaineGagnants',date);
  }
}