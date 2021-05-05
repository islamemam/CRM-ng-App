import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetRolesService {

    endpoint = environment.baseURL;
    token = localStorage.getItem('token');
    constructor(private http: HttpClient) { 
    }

    public getAll(){
        return this.http.get(this.endpoint+"/roles")
    }

    public getByPage(page){
        return this.http.get(this.endpoint+"/roles?page="+page)
    }
    

}