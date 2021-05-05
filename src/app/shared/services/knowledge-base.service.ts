import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class KnowledgeBaseService {
  constructor(private _HttpClient:HttpClient) {}
getCategories(page,keyWord){
  if(keyWord =='')
  return this._HttpClient.get(`${environment.baseURL}/categories?page=${page}`);
  else
  return this._HttpClient.get(`${environment.baseURL}/categories?page=${page}&knowledge_base_title=${keyWord}`);
}
addCategory(categoryModel){
  return this._HttpClient.post(`${environment.baseURL}/categories`, categoryModel)
}
addSubject(subjectModel){
return this._HttpClient.post(`${environment.baseURL}/knowledge-bases`, subjectModel);
}
getRoleId(){
  return this._HttpClient.get(`${environment.baseURL}/roles`)
}
updateSubject(subjectModel){
  return this._HttpClient.put(`${environment.baseURL}/knowledge-bases/${subjectModel.id}`, subjectModel);
  }
  destroySubject(subjectModel){
    return this._HttpClient.delete(`${environment.baseURL}/knowledge-bases/${subjectModel.id}`)
    }
}
