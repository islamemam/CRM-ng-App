import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  endpoint = environment.baseURL;

  constructor(private http: HttpClient) { }

  public getAll(pageNumber){ 
    return this.http.get(this.endpoint+"/questions?page=" + pageNumber);
  } 

  public save(model){ 
    return this.http.post(this.endpoint+"/questions", model);
  } 

  public delete(id){ 
    return this.http.delete(this.endpoint+"/questions/" + id);
  } 

  public getbyId(id){
    return this.http.get(this.endpoint+"/questions/" + id);
  }

  public update(id,model){
    return this.http.put(this.endpoint+"/questions/" + id, model);
  }
}
