import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainStatusService {
  endpoint = environment.baseURL;

  constructor(private http: HttpClient) { }

  public getAll(pageNumber){ 
    return this.http.get(this.endpoint+"/main-statuses?page=" + pageNumber);
  } 

  public save(model){ 
    return this.http.post(this.endpoint+"/main-statuses", model);
  } 

  public delete(id){ 
    return this.http.delete(this.endpoint+"/main-statuses/" + id);
  } 

  public getbyId(id){
    return this.http.get(this.endpoint+"/main-statuses/" + id);
  }

  public update(id,model){
    return this.http.put(this.endpoint+"/main-statuses/" + id, model);
  }
}
