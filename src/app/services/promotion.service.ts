import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Promo } from '../models/promotion-model';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  _url=environment.Api +'api/promotions';
  _url1=environment.Api +'api/promotions/';
  

  constructor(private http:HttpClient) { }

  Ajouter(p:Promo):Observable<Promo> {

    return this.http.post<Promo>(this._url, p);
  }

  Getall(id_part: number){
    return this.http.get<any>(this._url1+id_part);
  }

}
