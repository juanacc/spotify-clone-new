// import { Injectable, inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import {CookieService} from 'ngx-cookie-service';

// @Injectable({
//   providedIn: 'root',
// })

// export class PermissionsService {

//   constructor(private cookieService: CookieService, public router: Router) {}

//   canActivate(): boolean {
//     if (this.cookieService.check('token')) {
//       return true
//     }
//     else {
//       console.log('NO PASAS')
//       this.router.navigate(['/auth/login']);
//       return false
//     }
//   }
// }

// export const sessionGuard: CanActivateFn = (route, state) => {
//   //return true;
//   return inject(PermissionsService).canActivate();
// };
//https://stackoverflow.com/questions/76204932/how-to-use-canactivatefn-in-angular-16-via-constructor-dependency-injection

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor(private router: Router, private cookie: CookieService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.checkCookieSession();
  }

  checkCookieSession(): boolean {
    try {
      const existToken: boolean = this.cookie.check('token');
      console.log('Eexiste token', existToken)
      // if(existToken)
      //   return true;
      // else{
      //   this.router.navigate(['/auth']);
      //   return false;
      // }
      if(!existToken)
        this.router.navigate(['/auth']);
      return true;
    } catch (error) {
      console.log('Algo salio mal', error)
      return false;
    }
  }

}