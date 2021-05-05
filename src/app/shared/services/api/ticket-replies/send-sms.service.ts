import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SendSmsService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public sendSmsm(sms){ 
    return this.http.post(this.endpoint+"/send-sms",sms);
  } 
}
