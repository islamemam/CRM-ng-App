import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetRolesService {

  
  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public geRoles(token){ 
    return this.http.get(this.endpoint+"/roles?api_token="+token);
  } 
}
