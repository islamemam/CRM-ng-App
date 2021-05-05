import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetPrioritiesService {

  constructor(private http: HttpClient) { }
  public getPriorities(token){ 
    return this.http.get("http://54.245.188.65/ticketing_backend/public/api/priorities?api_token="+token);
  } 
}
