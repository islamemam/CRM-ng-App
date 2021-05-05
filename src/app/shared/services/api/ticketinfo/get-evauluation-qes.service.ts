import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetEvauluationQesService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public getEvauluations(token){ 
    return this.http.get(this.endpoint+"/question-categories?api_token="+token);
  } 
}
