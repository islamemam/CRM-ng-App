import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetCondetionsKeysService {

    token = localStorage.getItem('token');
    endpoint = environment.baseURL;
    
  constructor(private http: HttpClient) { }
  public getAll(){ 
    return this.http.get(this.endpoint + "/brcondition-keys?api_token="+this.token);
  } 
}
