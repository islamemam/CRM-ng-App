import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetDepartmentsService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public getDepartments(token){ 
    return this.http.get(this.endpoint+"/departments?api_token="+token);
  } 
}
