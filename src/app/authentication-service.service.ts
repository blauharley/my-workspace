import { Injectable } from '@angular/core';
import {BehaviorSubject, config, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  AUTH_URL: string = '/angularjs/my-workspace/server/auth_user.php';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(
                this.AUTH_URL,
          'username='+username+'&password='+password,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
        .pipe(map(resp => {
          let user = new User();
          console.log(resp);
          // login successful if there's a jwt token in the response
          if (resp.success && resp.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            let userInfo = {
              username: username,
              token: resp.token
            };
            localStorage.setItem('currentUser', JSON.stringify(userInfo));
            user.username = username;
            user.token = resp.token;
            this.currentUserSubject.next(user);
          }
          return user;
        }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
