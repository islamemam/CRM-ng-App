import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class GenericCrudService {

  endpoint: string = environment.baseURL;
  apiToken = localStorage.getItem('token');

  constructor(
    private http: HttpClient
  ) {}

  // CREATE
  create<T>(model: T | any, objToCreate: T | any): Observable<T | T[]> {
    return this.http.post<T | T[]>(`${this.endpoint}/${model.tableName}?api_token=`+this.apiToken, objToCreate);
  }

  // READ
  readAll<T>(model: T | any): Observable<ApiResponse<T[]>> {
    console.log('read crud');
    console.log(this.endpoint); 
    //?api_token="+token
    
    return this.http.get<ApiResponse<T[]>>(`${this.endpoint}/${model.tableName}?api_token=`+this.apiToken);
  }
  
  readAllByTicketNumber<T>(model: T | any,ticketId:number): Observable<ApiResponse<T[]>> {
    console.log('read crud');
    console.log(this.endpoint); 
    return this.http.get<ApiResponse<T[]>>(`${this.endpoint}/${model.tableName}?api_token=`+this.apiToken+`&ticket_id=${ticketId}`);
  }
  
  read<T>(model: T|any,id: number): Observable<ApiResponse<T>> {
 
    return this.http.get<ApiResponse<T>>(`${this.endpoint}/${model.tableName}/${id}?api_token=`+this.apiToken );

  }




  // UPDATE
  update<T>(model: T | any, objToUpdate: T | any): Observable<T | T[]> {
    return this.http.put<T | T[]>(`${this.endpoint}/${model.tableName}/${objToUpdate.id}?api_token=`+this.apiToken, objToUpdate);
  }

  // DELETE 
  delete<T>(model: T | any, objToDelete): Observable<T | T[]> {
    return this.http.delete<T | T[]>(`${this.endpoint}/${model.tableName}/${objToDelete.id}?api_token=`+this.apiToken);
  }

}
