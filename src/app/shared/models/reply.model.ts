
 export interface IReply extends IDataBaseObj {
    id?: number;
    ticket_id?: number;
    to?: number;
    from?: number;
    to_type?: String;
    from_type?: String;
    details?: String;
    subject?:String;
    deleted_at?: Date;
    created_at?: Date;
    updated_at?: Date;
    user?:any;
    
}


export class Reply implements IReply {
     
    static   tableName: string = 'replies';

    id: number;

    constructor(props: IReply) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
       
    }
}