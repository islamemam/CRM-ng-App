export class Client  {
    
     
    national_id: number;
    national_id_type_id: number;
    client_id: number;
    client_type_id: number;
    nationality_id: number;
    name: string;
    mobile: string;
    telephone: string;
    gender: string;
    email: string;
    birthdate: string;
    address: string;
    hospitals: [{hospital_id: number, file_number: number}];
    ministry_member: boolean;
}