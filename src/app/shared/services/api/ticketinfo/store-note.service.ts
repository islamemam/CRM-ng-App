import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StoreNoteService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public storeNote(token,note){ 
    return this.http.post(this.endpoint+"/notes?api_token="+token,note);
  } 
}
