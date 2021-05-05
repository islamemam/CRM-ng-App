// httpSetHeaders.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
 
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorageManger } from '../shared/local-storage-helper';
 
@Injectable()
export class httpSetHeaders implements HttpInterceptor {
    localStorageHelper = new LocalStorageManger();
    constructor(
        ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.url.indexOf('assets') == -1){
            if(request.url.indexOf('api_token') == -1)
            {
                if(request.url.indexOf('?') == -1){
                    request = request.clone({ url: request.url + '?api_token=' + this.getToken() });
                }else{
                    request = request.clone({ url: request.url + '&api_token=' + this.getToken() }); 
                }
            }
            if(this.getHospitalId() != null){
                request = request.clone({ url: request.url + '&hospital_id=' + this.getHospitalId() });            
            }
        }
        
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                console.log(data);
                return throwError(error);
            }));
    }

    getToken(){
        return localStorage.getItem('token');
    }

    getHospitalId(){
        return this.localStorageHelper.getHospitalId();
    }
}