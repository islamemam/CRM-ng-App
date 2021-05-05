export interface IClientG extends IDataBaseObj {
    id: number; 
    name?: string;
   
    
  }
  
  
  export class ClientG implements IClientG {
     
    static   tableName: string = 'clients';
  
    id: number;
   
    constructor(props: IClientG) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
       
    }
  }