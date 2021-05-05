import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetTicketTypesService {

  constructor(private http: HttpClient) { }
  public getTicketTypes(token){ 
    return this.http.get("http://54.245.188.65/ticketing_backend/public/api/ticket-types?api_token="+token);
  } 
}
