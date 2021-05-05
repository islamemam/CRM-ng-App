import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UpdateNoteService {

 
  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public updateNote(token,id,note){ 
    return this.http.put(this.endpoint+"/notes/"+id+"?api_token="+token,note);
  } 
}
