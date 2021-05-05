import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public getUsers(token){ 
    return this.http.get(this.endpoint+"/users?api_token="+token);
  } 
}
