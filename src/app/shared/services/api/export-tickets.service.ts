import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportTicketsService {

  
  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public export(file){ 
    return this.http.post(this.endpoint+"/export/tickets", file,{responseType: 'blob'});
  } 
}
