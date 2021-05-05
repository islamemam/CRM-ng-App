import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainReasonService {
  endpoint = environment.baseURL;

  constructor(private http: HttpClient) { }

  public getAll(pageNumber){ 
    return this.http.get(this.endpoint+"/main-reasons?page=" + pageNumber);
  } 

  public save(model){ 
    return this.http.post(this.endpoint+"/main-reasons", model);
  } 

  public delete(id){ 
    return this.http.delete(this.endpoint+"/main-reasons/" + id);
  } 

  public getbyId(id){
    return this.http.get(this.endpoint+"/main-reasons/" + id);
  }

  public update(id,model){
    return this.http.put(this.endpoint+"/main-reasons/" + id, model);
  }
}
