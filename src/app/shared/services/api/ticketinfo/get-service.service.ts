import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetServiceService {
 //get sources for addticket info components
 endpoint = environment.baseURL;
 constructor(private http: HttpClient) { 
 }
  public getSources(){ 
    return this.http.get(this.endpoint+"/sources");

  } 
}
