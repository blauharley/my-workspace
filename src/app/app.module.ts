import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NaviComponent } from './navi/navi.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToDoStatusPrioPipe } from './pipes/to-do-status-prio.pipe';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToDoComponent } from './Modals/to-do/to-do.component';
import { ToDoSearchPipe } from './pipes/to-do-search.pipe';
import { LoginComponent } from './login/login.component';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LocalStorageModule} from 'angular-2-local-storage';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NaviComponent,
    ToDoStatusPrioPipe,
    ToDoComponent,
    ToDoSearchPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LocalStorageModule.forRoot({
      prefix: 'my-app',
      storageType: 'localStorage'
    })
  ],
  providers: [
      {provide: LOCALE_ID, useValue: 'de' },
      {
        provide: 'canActivateTeam',
        useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(localeDe, 'de');
