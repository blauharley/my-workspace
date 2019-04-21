import { Component } from '@angular/core';
import {User} from './dataobjects/user';
import {Router} from '@angular/router';
import {AuthenticationServiceService} from './services/authentication-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-workspace';

  public currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationServiceService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth']);
  }

}
