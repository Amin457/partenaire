import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _Url = environment.Api +"api/partenaires/"
  
  constructor(private router : Router, private http: HttpClient) { }

  login(partenaire: any): Observable<any>{
    return  this.http.post<any>(`${this._Url}`+'login',partenaire);}
  
  demandePartenariat(partenaire: any): Observable<any>{
      return  this.http.post<any>(`${this._Url}`+'demandePartenariat',partenaire);}
}
