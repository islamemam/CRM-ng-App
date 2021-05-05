import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteBrActionsService {

    token = localStorage.getItem('token');
    endpoint = environment.baseURL;
    
  constructor(private http: HttpClient) { }
  public delete(id){ 
    return this.http.delete(this.endpoint + "/business-rules/" + id +"?api_token="+this.token);
  } 
}