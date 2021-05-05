import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetSubReasonsService {

  constructor(private http: HttpClient) { }
  public getSubReasons(token,id){ 
    return this.http.get("http://54.245.188.65/ticketing_backend/public/api/sub-reasons?api_token="+token+"&main_reason_id="+id);
  } 
}
