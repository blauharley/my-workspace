import { BrowserModule } from '@angular/platform-browser';
import {NgModule, LOCALE_ID, TrackByFunction} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NaviComponent } from './components/navi/navi.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToDoStatusPrioPipe } from './pipes/to-do-status-prio.pipe';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToDoComponent } from './components/modals/to-do/to-do.component';
import { ToDoSearchPipe } from './pipes/to-do-search.pipe';
import { LoginComponent } from './components/login/login.component';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LocalStorageModule} from 'angular-2-local-storage';
import { InfoComponent } from './components/modals/info/info.component';
import { ClockComponent } from './components/clock/clock.component';
import { ShopComponent } from './components/shop/shop.component';
import { RegexComponent } from './components/modals/regex/regex.component';
import {UseYourOwnRegExModule} from '../../projects/use-your-own-reg-ex/src/lib/use-your-own-reg-ex.module';
import { TransformMyRegExpIntoStringsPipe } from './pipes/transform-my-reg-exp-into-strings.pipe';
import { ShopcategoriyComponent } from './components/shopcategoriy/shopcategoriy.component';
import { ShoptypeComponent } from './components/shoptype/shoptype.component';
import { ShopthemeComponent } from './components/shoptheme/shoptheme.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NaviComponent,
    ToDoStatusPrioPipe,
    ToDoComponent,
    ToDoSearchPipe,
    LoginComponent,
    InfoComponent,
    ClockComponent,
    ShopComponent,
    RegexComponent,
    TransformMyRegExpIntoStringsPipe,
    ShopcategoriyComponent,
    ShoptypeComponent,
    ShopthemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    UseYourOwnRegExModule,
    LocalStorageModule.forRoot({
      prefix: 'my-workspace',
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
