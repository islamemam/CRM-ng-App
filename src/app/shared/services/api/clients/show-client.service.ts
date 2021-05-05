import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowClientService {

  endpoint = environment.baseURL;

  constructor(private http: HttpClient) { }

  public showClient(token,id){ 
    return this.http.get(this.endpoint+"/clients/"+id+"?api_token="+token);
  } 
}

