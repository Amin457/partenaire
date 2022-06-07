import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notif } from '../models/notif';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _Url = environment.Api +"api/notification/notif"
  
  constructor(private http: HttpClient) { }

  send(notif: Notif): Observable<Notif>{
    return  this.http.post<Notif>(`${this._Url}`,notif);}
}
