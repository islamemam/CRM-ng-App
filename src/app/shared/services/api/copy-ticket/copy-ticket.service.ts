import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CopyTicketService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  object={};
  copyTicket(id){ 
    return this.http.post(this.endpoint+'/ticket/copy/'+id,this.object);
  } 
} 
