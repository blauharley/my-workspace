import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private localStorageService:LocalStorageService, private router: Router){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authUser()){
      return true;
    }
    this.router.navigate(['auth'],{ queryParams: { returnUrl: state.url }});
    return false;
  }

  private authUser(): boolean{
    return this.localStorageService.get("username") === 'josef' && this.localStorageService.get("pass") === '12345';
  }
}
