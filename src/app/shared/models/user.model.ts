export interface IUser extends IDataBaseObj {
    id: number;
    name?:String;
    email?:String;
    
  
    
  }
  
  
  export class User implements IUser {
     
    static   tableName: string = 'users';
  
    id: number;
   
    constructor(props: IUser) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
       
    }
  }