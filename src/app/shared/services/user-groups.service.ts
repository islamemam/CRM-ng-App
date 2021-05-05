import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserGroupsService {

  constructor(private _HttpClient:HttpClient) { }
getusersGroup(page){
 return this._HttpClient.get(`${environment.baseURL}/roles?page=${page}`);
}
getusersGroupPermissions(){
  return this._HttpClient.get(`${environment.baseURL}/permissions`);
 }
deleteUserGroup(userGroupModel){
return this._HttpClient.delete(`${environment.baseURL}/users/api/${userGroupModel.id}`)
}
addUserGroup(userGroupModel){
return this._HttpClient.post(`${environment.baseURL}/roles`, userGroupModel)
}
updateUserGroup(userGroupModel){
return this._HttpClient.put(`${environment.baseURL}/roles/${userGroupModel.id}`, userGroupModel)
}

}