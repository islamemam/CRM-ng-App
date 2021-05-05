import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class GetTicketsService {

  apiToken = localStorage.getItem('token');
  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  
  public getTickets(page){ 
    return this.http.get(this.endpoint+"/tickets?page="+page+"&without_merged=1");
  } 

  public getTicketsWithParams(objectParams: {[param: string]: string}){ 
    const httpParams = new HttpParams({fromObject: objectParams});
    return this.http.get(this.endpoint+"/tickets?api_token="+this.apiToken, {params: httpParams});
  } 

  public search(searchobject,page){ 
    const params = new HttpParams({fromObject: searchobject});
    return this.http.get(this.endpoint+"/tickets?page="+page, {params: params});
  } 

}
