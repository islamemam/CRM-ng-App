import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  endpoint = environment.baseURL;

  constructor(private http: HttpClient) { }

  public getAll(pageNumber){ 
    return this.http.get(this.endpoint+"/tags?page=" + pageNumber);
  } 

  public save(model){ 
    return this.http.post(this.endpoint+"/tags", model);
  } 

  public delete(id){ 
    return this.http.delete(this.endpoint+"/tags/" + id);
  } 

  public getbyId(id){
    return this.http.get(this.endpoint+"/tags/" + id);
  }

  public update(id,model){
    return this.http.put(this.endpoint+"/tags/" + id, model);
  }
}
