import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TicketFilterService {

  constructor(private _HttpClient:HttpClient) { }
getDeletedTickets(only_trashed_flag,page){
  return this._HttpClient.get(`${environment.baseURL}/tickets?only_trashed_flag=${only_trashed_flag}&page=${page}`)
}
getUnSolvedTickets(unsolved_flag,page){
  return this._HttpClient.get(`${environment.baseURL}/tickets?unsolved_flag=${unsolved_flag}&page=${page}`)
}
getUnAssignedTickets(unassigned_flag,page){
  return this._HttpClient.get(`${environment.baseURL}/tickets?unassigned_flag=${unassigned_flag}&page=${page}`)
}
getDueDateTickets(resolved_at,page){
  return this._HttpClient.get(`${environment.baseURL}/tickets?resolved_at=${new Date()}&page=${page}`)
}
getTicketsStatus(status_id,page){
  return this._HttpClient.get(`${environment.baseURL}/tickets?status_id=${status_id}&page=${page}`)
}
}