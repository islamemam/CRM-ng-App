import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UpdateTicketService {
  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public updateTicket(token,id,ticket){ 
    return this.http.put(this.endpoint+"/tickets/"+id+"?api_token="+token, ticket);
  } 
}
