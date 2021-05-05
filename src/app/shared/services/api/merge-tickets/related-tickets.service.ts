import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RelatedTicketsService {

    endpoint = environment.baseURL;
  constructor(private http: HttpClient) { }

  public get(token, ticketId){
    return this.http.get(this.endpoint + "/related-tickets/" + ticketId + "?api_token="+token);
  }

}
