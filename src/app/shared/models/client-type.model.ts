export interface IClientType extends IDataBaseObj {
    id: number;
    title_en?: String;
    title_ar?: String;
    
    
}


export class ClientType implements IClientType {
     
    static   tableName: string = 'client-types';

    id: number;

    constructor(props: IClientType) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
       
    }
}