 export interface INote extends IDataBaseObj {
  id?: number;
  ticket_id?:number;
  title?: string;
  details?: string;
  deleted_at?: Date;
  created_at?: Date;
  updated_at?: Date; 

  
}


export class Note implements INote {
   
  static   tableName: string = 'notes';

  id: number;
  
  
  constructor(props: INote) {
      Object.keys(props).forEach(prop => {
          const value = props[prop];
          this[prop] = value;
      });
     
  }
}