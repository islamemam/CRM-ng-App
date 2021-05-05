import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetClientIdService {
 
  
  idEmitter = new EventEmitter<String>()
  constructor() { 
    
  }

  updateId(id: String){
    this.idEmitter.emit(id);
  }

}
