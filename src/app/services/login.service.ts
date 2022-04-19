import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _Url = "http://localhost:3000/api/partenaires/"
  
  constructor(private router : Router, private http: HttpClient) { }

  login(partenaire: any): Observable<any>{
    return  this.http.post<any>(`${this._Url}`+'login',partenaire);}
}
