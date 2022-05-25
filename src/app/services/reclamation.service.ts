import { Injectable } from '@angular/core';
import { Reclamation } from '../models/reclamation-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  _url=environment.Api +'api/reclamation/'

  constructor(private http:HttpClient) { }

  Getreclamation(id_part:number):Observable<any>{
    return this.http.get<Reclamation>(`${this._url}`+id_part);
  }
}
  