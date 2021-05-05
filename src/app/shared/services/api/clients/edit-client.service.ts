import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EditClientService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public updateClient(token,id,client){ 
    return this.http.put(this.endpoint+"/clients/"+id+"?api_token="+token,client);
  } 
}
