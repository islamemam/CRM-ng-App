import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

constructor(private _HttpClient:HttpClient) { }
getTicketsStatistics(){
return this._HttpClient.get(`${environment.baseURL}/dashboards`)
}
getFilteredTicketsStatistics(hospital_id){
  return this._HttpClient.get(`${environment.baseURL}/dashboards?hospital_id=${hospital_id}`)
  }
getHospitalId(){
  return this._HttpClient.get(`${environment.baseURL}/hospitals`)
}
}
