import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MergeReasonService {
  endpoint = environment.baseURL;

  constructor(private http: HttpClient) { }

  public getAll(pageNumber){ 
    return this.http.get(this.endpoint+"/merge-reasons?page=" + pageNumber);
  } 

  public save(model){ 
    return this.http.post(this.endpoint+"/merge-reasons", model);
  } 

  public delete(id){ 
    return this.http.delete(this.endpoint+"/merge-reasons/" + id);
  } 

  public getbyId(id){
    return this.http.get(this.endpoint+"/merge-reasons/" + id);
  }

  public update(id,model){
    return this.http.put(this.endpoint+"/merge-reasons/" + id, model);
  }
}
