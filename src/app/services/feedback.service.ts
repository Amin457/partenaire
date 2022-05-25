import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddQuestion } from '../models/add-question-model';
import { AddReponse } from '../models/add-reponse-model';
import { StatFeed, StatFeedQuestion, StatFeedRep, StatFeedReponse } from '../models/stat-feed-model';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  _url = environment.Api + 'api/feedback/';
  _url1= environment.Api + 'api/';
  _url2= environment.Api + 'api/statFeed/'

  constructor(private http: HttpClient) { }

  Getfeedback(id_part:number): Observable<any> {
    return this.http.get<Feedback>(`${this._url}` + `getFeed/`+id_part);
  }

  AddQuestion(AddQuestion: AddQuestion): Observable<any> {
    return this.http.post<AddQuestion>(`${this._url}` + `question/insertQuestion`, AddQuestion);
  }

  AddReponse(AddReponse: AddReponse): Observable<any> {
    return this.http.post<AddReponse>(`${this._url}` + `question/insertReponse`, AddReponse);

  }

  GetReponse(id_question: number): Observable<any> {
    return this.http.get<AddReponse>(`${this._url}` + `question/getReponse/` + id_question);
  }

  getAllQuestion(id_part: number): Observable<any> {
    return this.http.get<Feedback>(`${this._url}` + `question/` + id_part);
  }

  //statistiques

  StatFeedQuestion(obj:StatFeed):Observable<any>{
    return this.http.post<StatFeedQuestion>(`${this._url2}` + `Question`,obj);
  }

  StatFeed(obj:StatFeedRep):Observable<any>{
    return this.http.post<StatFeedReponse>(`${this._url2}` + `nbrRep`,obj);
  }

}
