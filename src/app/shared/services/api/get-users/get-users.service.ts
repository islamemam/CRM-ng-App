import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  
  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public getUsers(token){ 
    return this.http.get(this.endpoint+"/import/users?api_token="+token);
  } 
}
