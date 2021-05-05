import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImportClientsService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public addClient(token,file){ 
    return this.http.post(this.endpoint+"/import/clients?api_token="+token, file);
  } 
}
