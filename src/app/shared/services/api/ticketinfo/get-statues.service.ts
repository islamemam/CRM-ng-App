import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetStatuesService {

  constructor(private http: HttpClient) { }
  public getStatuses(token){ 
    return this.http.get("http://54.245.188.65/ticketing_backend/public/api/statuses?api_token="+token);
  } 
}
