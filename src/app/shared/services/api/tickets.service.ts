import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private ticketsURL= environment.baseURL+"tickets";
  private notesURL= environment.baseURL+"notes";
  private repliesURL= environment.baseURL+"replies";
  private statusesURL= environment.baseURL+"statuses";
  apiToken = localStorage.getItem('token');
  

  constructor(private http: HttpClient) { }


  get CurrentLanguage(): string {
    const lang = localStorage.getItem('lang');
    if (lang === 'en' && lang != null) {
      return 'en';
    } else {
      return 'ar';
    }
  }

}
