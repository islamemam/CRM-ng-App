import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetClientTypesService {
  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { }

  public getClientTypes(token){ 
    return this.http.get(this.endpoint+"/client-types?api_token="+token);
  } 
}
