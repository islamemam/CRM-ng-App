import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DeleteTicketService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public deleteTicket(token,ticketid){ 
    return this.http.delete(this.endpoint+"/tickets/"+ticketid+"?api_token="+token);
  } 
}
