import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetRepliesService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public getRepliesBasedOnTicketId(id){ 
    return this.http.get(this.endpoint+"/replies?ticket_id="+id);
  } 
}
