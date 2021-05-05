import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MergeService {

    endpoint = environment.baseURL;
  constructor(private http: HttpClient) { }

  public save(token, model){
    return this.http.post(this.endpoint + "/merges?api_token="+token, model);
  }

}
