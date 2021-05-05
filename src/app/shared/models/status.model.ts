 export interface IStatus extends IDataBaseObj {
  id?: number;
  main_status_id?: number;
  title_en? :String;
  title_ar? :String;
  title? :String;
  deleted_at?: Date;
  created_at?: Date;
  updated_at?: Date; 

   
}


export class Status implements IStatus {
   
  static   tableName: string = 'status';

  id: number;
  
  
  constructor(props: IStatus) {
      Object.keys(props).forEach(prop => {
          const value = props[prop];
          this[prop] = value;
      });
     
  }
}