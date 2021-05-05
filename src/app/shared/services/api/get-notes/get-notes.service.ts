import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetNotesService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public getNotes(token,clientId){ 
    return this.http.get(this.endpoint+"/notes?api_token="+token+"&client_id="+clientId);
  } 
  public getNotesBasedOnTicket(token,ticketID){ 
    return this.http.get(this.endpoint+"/notes?api_token="+token+"&ticket_id="+ticketID);
  } 
}
