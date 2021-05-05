import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetSubClientService {

  constructor(private http: HttpClient) { }
  public getSubClient(token,clientId){ 
    return this.http.get("http://54.245.188.65/ticketing_backend/public/api/clients?api_token="+token+"&client_id="+clientId);
  } 
}
