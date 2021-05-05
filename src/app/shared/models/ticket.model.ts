import { IStatus } from './status.model';

 export interface ITicket extends IDataBaseObj {
  id?: number;
 

  status?:IStatus;
  
  details?: string;
  deleted_at?: Date;
  created_at?: Date;
  updated_at?: Date; 

  
}


export class Ticket implements ITicket {
   
  static   tableName: string = 'tickets';

  id: number;
  
  
  constructor(props: ITicket) {
      Object.keys(props).forEach(prop => {
          const value = props[prop];
          this[prop] = value;
      });
     
  }
}