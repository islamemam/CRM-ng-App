
 export interface IExternalUnit extends IDataBaseObj {
    id: number;
    title_en?: String;
    title_ar?: String;
    email?: String;
    mobile?: String;
    representative_name?: String;
    

    
}


export class ExternalUnit implements IExternalUnit {
     
    static   tableName: string = 'external-units';

    id: number;

    constructor(props: IExternalUnit) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
       
    }
}