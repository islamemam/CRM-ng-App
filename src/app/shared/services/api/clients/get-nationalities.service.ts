import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetNationalitiesService {
  endpoint = environment.baseURL;

  constructor(private http: HttpClient) { }

  public getNationalities(token){ 
    return this.http.get(this.endpoint+"/nationalities?api_token="+token);
  } 
}
