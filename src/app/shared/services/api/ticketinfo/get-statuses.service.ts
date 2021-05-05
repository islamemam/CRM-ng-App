import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetStatusesService {

 
  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public getStatuesByTicketID(token,id){ 
    return this.http.get(this.endpoint+"/statuses?api_token="+token+"&ticket_id="+id);
  } 
}
