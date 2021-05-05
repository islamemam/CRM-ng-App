import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetNationalIdTypesService {
  endpoint = environment.baseURL;

  constructor(private http: HttpClient) { }

  public getNationalid(token){ 
    return this.http.get(this.endpoint+"/national-id-types?api_token="+token);
  } 
}
