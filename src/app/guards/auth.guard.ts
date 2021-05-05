import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageManger } from '../shared/local-storage-helper';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    localStorageHelper = new LocalStorageManger();
    constructor(
        private router: Router,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const permissionList = this.localStorageHelper.getPermissions();
        let currentData = route.data[0];
        if(permissionList.find(f => f.name == currentData) != null){
            return true;
        }
        this.router.navigate(['/']);
        return false;

        if (true) {
            // check if route is restricted by role
            console.log(route.data);
            //  && route.data.roles.indexOf(currentUser.role) === -1
            if (route.data.roles) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }
 
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}