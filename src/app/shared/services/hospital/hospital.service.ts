import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  endpoint = environment.baseURL;

  constructor(private http: HttpClient) { }

  public getAll(pageNumber){ 
    return this.http.get(this.endpoint+"/hospitals?page=" + pageNumber);
  } 

  public save(model){ 
    return this.http.post(this.endpoint+"/hospitals", model);
  } 

  public delete(id){ 
    return this.http.delete(this.endpoint+"/hospitals/" + id);
  } 

  public getbyId(id){
    return this.http.get(this.endpoint+"/hospitals/" + id);
  }

  public update(id,model){
    return this.http.put(this.endpoint+"/hospitals/" + id, model);
  }
}
