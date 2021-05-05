import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionCategoryService {
  endpoint = environment.baseURL;

  constructor(private http: HttpClient) { }

  public getAll(pageNumber){ 
    return this.http.get(this.endpoint+"/question-categories?page=" + pageNumber);
  } 

  public save(model){ 
    return this.http.post(this.endpoint+"/question-categories", model);
  } 

  public delete(id){ 
    return this.http.delete(this.endpoint+"/question-categories/" + id);
  } 

  public getbyId(id){
    return this.http.get(this.endpoint+"/question-categories/" + id);
  }

  public update(id,model){
    return this.http.put(this.endpoint+"/question-categories/" + id, model);
  }
}
