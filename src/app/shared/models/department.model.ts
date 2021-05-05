export interface IDepartment extends IDataBaseObj {
    id: number;
    ticket_id?:number;
    title_ar?: string;
    details?: string;
    deleted_at?: Date;
    created_at?: Date;
    updated_at?: Date; 
  
    
  }
  
  
  export class Department implements IDepartment {
     
    static   tableName: string = 'departments';
  
    id: number;
   
    constructor(props: IDepartment) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
       
    }
  }