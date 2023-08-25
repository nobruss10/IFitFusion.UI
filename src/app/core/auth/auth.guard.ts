import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(!this.userService.isLogged()) {
        this.router.navigate(['login']);
        return false;
      }
      
      this.userService.loadSession();
      
      if(route.data.claim) {
        if(!this.userService.hasClaim(route.data.claim)) {
          this.router.navigate(['403'])
          return false;
        }
      }
        
      return true;
  }
  
}
