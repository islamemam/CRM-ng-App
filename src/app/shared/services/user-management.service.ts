import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private _HttpClient: HttpClient) { }
  getusersManagement(page, general) {
    if (general == '')
      return this._HttpClient.get(`${environment.baseURL}/users?page=${page}`);
    else
      return this._HttpClient.get(`${environment.baseURL}/users?page=${page}&general=${general}`);
  }
  deleteUser(userModel) {
    return this._HttpClient.delete(`${environment.baseURL}/users/${userModel.id}`)
  }
  adduserManagement(userModel) {
    return this._HttpClient.post(`${environment.baseURL}/users?`, userModel)
  }
  updateUserManagement(id,userModel) {
    return this._HttpClient.put(`${environment.baseURL}/users/${id}`, userModel)
  }
  getHospitalId() {
    return this._HttpClient.get(`${environment.baseURL}/hospitals`)
  }
  getRoleId() {
    return this._HttpClient.get(`${environment.baseURL}/roles`)
  }
  getdepartment() {
    return this._HttpClient.get(`${environment.baseURL}/roles`)
  }
  showUserInfo(userId) {
    return this._HttpClient.get(`${environment.baseURL}/users/${userId}`)
}
  changeUserPassWord(userId,changePassWordModel) {
  return this._HttpClient.post(`${environment.baseURL}/update_password/${userId}`,changePassWordModel)
  }
  }