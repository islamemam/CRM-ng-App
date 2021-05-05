 export interface IHospital extends IDataBaseObj {
  id?: number;
  
  title_en? :String;
  title_ar? :String;
  title? :String;
  code?:String;
  address_ar?:String;
  address_en?:String;
  google_map_url?:String;
  mobile?:String;
  telephone?:String;
  hotline?:String;
  
/* "id": 1,
                "title_en": "aaaa",
                "title_ar": "bbbb",
                "code": "15962",
                "address_en": "sdsd-dsds-dsa\/dsd",
                "address_ar": "sdsd-dsds-dsa\/dsdaaaa",
                "google_map_url": "https:\/\/laravel.com\/docs\/5.8\/validationn",
                "mobile": 1149702173,
                "telephone": 37328545,
                "hotline": 336,
                */

  deleted_at?: Date;
  created_at?: Date;
  updated_at?: Date; 

   
}


export class Hospital implements IHospital {
   
  static   tableName: string = 'hospitals';

 
  
  constructor(props: IHospital) {
      Object.keys(props).forEach(prop => {
          const value = props[prop];
          this[prop] = value;
      });
 
     
  }
}