import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImportClientsHospitalsService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public addClientsHospitals(token,file){ 
    return this.http.post(this.endpoint+"/import/client-hospitals?api_token="+token, file);
  } 
}
