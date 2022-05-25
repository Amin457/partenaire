import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  __url= environment.Api +'api/files/upload';

  constructor(private http: HttpClient) { }

  postFile(file:any):Observable<any>{

    return this.http.post(this.__url,file);
  }


}
