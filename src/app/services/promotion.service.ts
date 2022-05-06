import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promo } from '../models/promotion-model';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  _url='http://localhost:3000/api/promotions';
  _url1='http://localhost:3000/api/promotions/4';
  

  constructor(private http:HttpClient) { }

  Ajouter(p:Promo):Observable<Promo> {

    return this.http.post<Promo>(this._url, p);
  }

  Getall(){
    return this.http.get<any>(this._url1);
  }

}
