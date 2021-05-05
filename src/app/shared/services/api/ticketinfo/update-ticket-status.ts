import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UpdateTicketStatusService {

 
  endpoint = environment.baseURL;
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) { 
  }
  public closeTickets(closeObject){ 
    return this.http.put
    (this.endpoint+"/ticket/status/closed?api_token="+this.token
    ,closeObject);
  } 
}