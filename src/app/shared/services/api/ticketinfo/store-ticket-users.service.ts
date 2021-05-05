import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StoreTicketUsersService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public storeUser(token,user){ 
    return this.http.post(this.endpoint+"/ticket-users?api_token="+token,user);
  } 
}
