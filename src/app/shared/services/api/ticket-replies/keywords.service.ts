import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class KeywordsService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public getpages(){ 
    return this.http.get(this.endpoint+"/reply-template-keywords");
  }
  public getKeyword(page){ 
    return this.http.get(this.endpoint+"/reply-template-keywords?page="+page);
  }
}
