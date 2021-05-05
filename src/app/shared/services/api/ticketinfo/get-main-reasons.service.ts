import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetMainReasonsService {

  constructor(private http: HttpClient) { }
  public getMainReasons(token,id){ 
    return this.http.get("http://54.245.188.65/ticketing_backend/public/api/main-reasons?api_token="+token+"&ticket_type_id="+id);
  } 
}
