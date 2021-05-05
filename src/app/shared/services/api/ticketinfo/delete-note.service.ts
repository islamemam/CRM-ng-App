import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DeleteNoteService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public deleteNote(token,id){ 
    return this.http.delete(this.endpoint+"/notes/"+id+"?api_token="+token);
  } 
}
