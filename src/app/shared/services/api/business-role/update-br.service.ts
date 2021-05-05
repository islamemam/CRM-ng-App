import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateBRService {

    token = localStorage.getItem('token');
    endpoint = environment.baseURL;
    
  constructor(private http: HttpClient) { }
  public update(model, id){ 
    return this.http.put(this.endpoint + "/business-rules/" + id +"?api_token="+this.token, model);
  } 
}
