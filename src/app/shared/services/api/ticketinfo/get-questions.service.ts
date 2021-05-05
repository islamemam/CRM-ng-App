import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetQuestionsService {
  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public getAll(token){ 
    return this.http.get(this.endpoint+"/questions?api_token="+token);
  } 
}
