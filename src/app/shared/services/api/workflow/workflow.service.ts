import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WorkFlowService {

  endpoint = environment.baseURL;
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) { 
  }

  public getTicketTypes(token){ 
    return this.http.get(this.endpoint+"/ticket-types?api_token="+token);
  }
  
  public getAllSla(token){
    return this.http.get(this.endpoint+"/sla-plans?api_token="+token);
  }

  public saveSLA(token,data){
    return this.http.post(this.endpoint+ "/sla-plans?api_token="+token, data);
  }

  public updateSLA(token,data,id){
    return this.http.put(this.endpoint+ "/sla-plans/" + id +"?api_token="+token, data);
  }

  public getSlaDataById(token, id){
    return this.http.get(this.endpoint+"/sla-plans/" + id + "?api_token="+token)
  }

  public deleteSLA(token, id){
    return this.http.delete(this.endpoint+"/sla-plans/" + id + "?api_token="+token)
  }

  // public getsLaCondetionsKeys(){
  //   return this.http.get(this.endpoint+"/slacondition-keys?api_token="+ this.token);
  // }

  public getStatus(){
    return this.http.get(this.endpoint+"/statuses?api_token="+ this.token);
  }

  public getSLACondetionsKeys(){
    return this.http.get(this.endpoint+"/slacondition-keys?api_token="+ this.token);
  }
}