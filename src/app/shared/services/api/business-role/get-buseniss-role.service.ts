import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetBusenissRoleService {

    token = localStorage.getItem('token');
    endpoint = environment.baseURL;
    
  constructor(private http: HttpClient) { }
  public getAll(page_number){ 
    return this.http.get(this.endpoint + "/business-rules" + "?page=" + page_number);
  } 

  public getById(id){ 
    return this.http.get(this.endpoint + "/business-rules/" + id +"?api_token="+this.token);
  } 
}
