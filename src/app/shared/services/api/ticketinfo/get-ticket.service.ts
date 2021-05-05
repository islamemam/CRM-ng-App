import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetTicketService {
  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public showTicket(token,ticketid){ 
    return this.http.get(this.endpoint+"/tickets?api_token="+token+"&id="+ticketid);
  } 
}
