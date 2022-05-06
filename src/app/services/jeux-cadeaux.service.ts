import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cadeaux } from '../models/tab-cadeaux-model';

@Injectable({
  providedIn: 'root'
})
export class JeuxCadeauxService {

  url='http://localhost:3000/api/cadeau/4'
  url_add_gift='http://localhost:3000/api/cadeau/ajouterCadeau'
  url_delete_gift='http://localhost:3000/api/cadeau'

  constructor (private http:HttpClient) { }

  GetCadeaux():Observable<any>{
    return this.http.get<Cadeaux>(`${this.url}`);
  }

  addCadeau(cadeau:any):Observable<any>{
    return this.http.post<any>(`${this.url_add_gift}`,cadeau);
  }

  DeleteCadeau(id_cadeau:number):Observable<any>{
    return this.http.patch<any>(`${this.url_delete_gift}/${id_cadeau}`,{});
  }
}
