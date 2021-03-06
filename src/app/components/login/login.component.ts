import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationServiceService} from '../../services/authentication-service.service';
import {first} from 'rxjs/operators';
declare var $ :any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  infoModalTitle: string = 'Authentication';
  infoModalName: string = 'authFailModal';
  infoModalMessage: string = 'Authentication failed...try again';

  constructor(private localStorageService:LocalStorageService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationServiceService) { }

  ngOnInit() {
    let fields = {
      username: ['', [Validators.required,Validators.email,Validators.maxLength(50)]],
      password: ['', [Validators.required,Validators.minLength(3)]]
    };
    this.loginForm = this.formBuilder.group(fields);

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    setTimeout(()=>{
      for(let field in fields){
        this.loginForm.controls[field].setErrors(null);
      }
    },0);

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              this.router.navigate([this.returnUrl]);
            },
            error => {
              $('#'+this.infoModalName).modal('show');
              this.error = error;
              this.loading = false;
            });
  }

}
