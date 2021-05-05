export class ApiResponse<T> {
    data: T;
    links?:linksInfo;
    meta?:  PagniationInfo;

    

    constructor() {
        this.errors = [];
      }
      errors: ApiError[];
      getErrorsText(): string {
        return this.errors.map(e => e.message).join(' ');
      }
      hasErrors(): boolean {
        return this.errors.length > 0;
      }

      
}

export class ApiError {  fieldname:string; message: string; }
export class linksInfo { 
    first:String;
     last:String;
     prev:String;
     next:String;
  
 }
export class PagniationInfo {  
  current_page:number; 
  from: string; 
  last_page:number;
  per_page:number;
  to:number;
  total:number; 
}