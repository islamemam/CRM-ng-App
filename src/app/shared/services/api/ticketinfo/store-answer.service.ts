import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StoreAnswerService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public storeAnswer(answer){ 
    return this.http.post(this.endpoint+"/answers",answer);
  } 
}
