import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DownloadTemplatesService {

  
  endpoint = environment.baseURL;
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) { 
  }

  public downloadTemplates(){
      return this.http.get(this.endpoint+"/settings?api_token="+this.token+"&keys[]=client_hospital_template&keys[]=client_template")
  }
}
