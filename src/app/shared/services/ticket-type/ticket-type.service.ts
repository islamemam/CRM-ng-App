import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketTypeService {
  endpoint = environment.baseURL;

  constructor(private http: HttpClient) { }

  public getAll(pageNumber){ 
    return this.http.get(this.endpoint+"/ticket-types?page=" + pageNumber);
  } 

  public save(model){ 
    return this.http.post(this.endpoint+"/ticket-types", model);
  } 

  public delete(id){ 
    return this.http.delete(this.endpoint+"/ticket-types/" + id);
  } 

  public getbyId(id){
    return this.http.get(this.endpoint+"/ticket-types/" + id);
  }

  public update(id,model){
    return this.http.put(this.endpoint+"/ticket-types/" + id, model);
  }
}
