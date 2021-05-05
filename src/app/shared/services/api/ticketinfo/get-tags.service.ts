import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetTagsService {

  constructor(private http: HttpClient) { 
  }
  
  public getTags(token){ 
    return this.http.get("http://54.245.188.65/ticketing_backend/public/api/tags?api_token="+token);
  } 
}
