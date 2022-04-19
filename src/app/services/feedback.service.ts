import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback-model'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  _url='http://localhost:3000/api/feedback/3'

  constructor(private http:HttpClient) { }

  Getfeedback():Observable<any>{
    return this.http.get<Feedback>(`${this._url}`);
  }
  
}
