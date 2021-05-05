import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../models/client.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    apiURL = '';

    constructor(private http: HttpClient) {};

    create(client: Client): Observable<Client> {
        return this.http.post<Client>(this.apiURL, client);
    }

}