import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaveBRService {

    token = localStorage.getItem('token');
    endpoint = environment.baseURL;
    
  constructor(private http: HttpClient) { }
  public save(model){ 
    return this.http.post(this.endpoint + "/business-rules?api_token="+this.token, model);
  } 
}
