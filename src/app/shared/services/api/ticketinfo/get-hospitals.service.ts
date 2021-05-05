import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GetHospitalsService {
  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { }
  public getHospitals(token){ 
    return this.http.get(this.endpoint+"/hospitals?"+token);
  } 
  public getHospitalsByPage(page){ 
    return this.http.get(this.endpoint+"/hospitals?page="+page);
  } 
}
