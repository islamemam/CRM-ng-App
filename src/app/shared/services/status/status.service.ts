import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  endpoint = environment.baseURL;

  constructor(private http: HttpClient) { }

  public getAll(pageNumber){ 
    return this.http.get(this.endpoint+"/statuses?page=" + pageNumber);
  } 

  public save(model){ 
    return this.http.post(this.endpoint+"/statuses", model);
  } 

  public delete(id){ 
    return this.http.delete(this.endpoint+"/statuses/" + id);
  } 

  public getbyId(id){
    return this.http.get(this.endpoint+"/statuses/" + id);
  }

  public update(id,model){
    return this.http.put(this.endpoint+"/statuses/" + id, model);
  }
}
