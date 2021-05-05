import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetExternalUnitsService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public getExternalUnits(token){ 
    return this.http.get(this.endpoint+"/external-units?api_token="+token);
  } 
}
