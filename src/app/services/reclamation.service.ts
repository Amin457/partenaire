import { Injectable } from '@angular/core';
import { Reclamation } from '../models/reclamation-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  _url='http://localhost:3000/api/reclamation/4'

  constructor(private http:HttpClient) { }

  Getreclamation():Observable<any>{
    return this.http.get<Reclamation>(`${this._url}`);
  }
}
  