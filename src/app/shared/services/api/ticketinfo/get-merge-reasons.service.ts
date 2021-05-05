import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GetMergeReasons {

    endpoint = environment.baseURL;
  constructor(private http: HttpClient) { }
  public getAll(token){ 
    return this.http.get(this.endpoint+"/merge-reasons?api_token="+token);
  } 
}