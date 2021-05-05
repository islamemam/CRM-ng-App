import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppSearchService {

  constructor(private _HttpClient:HttpClient) { }
  getusersManagement(page,general){
   return this._HttpClient.get(`${environment.baseURL}/users?page=${page}&general=${general}`);
  }
  getClients(general){
   return this._HttpClient.get(`${environment.baseURL}/clients?general=${general}`);
  }
  getTickets(general){
    return this._HttpClient.get(`${environment.baseURL}/tickets?general=${general}`);
   }
}
