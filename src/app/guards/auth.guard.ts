import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../dataobjects/user';
import {AuthenticationServiceService} from '../services/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private currentUser: User = null;

  constructor(private router: Router, private authService: AuthenticationServiceService){
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authUser()){
      return true;
    }
    this.router.navigate(['auth'],{ queryParams: { returnUrl: state.url }});
    return false;
  }

  private authUser(): boolean{
    return this.currentUser && this.currentUser.token && this.currentUser.token.length > 0;
  }
}
