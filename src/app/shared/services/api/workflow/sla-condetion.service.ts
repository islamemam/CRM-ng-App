import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SLACondetionService {

  endpoint = environment.baseURL;
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) { 
  }

  public getAll(){
    return this.http.get(this.endpoint+"/slacondition?api_token=" + this.token)
  }

}