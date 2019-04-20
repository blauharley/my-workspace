import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NaviComponent } from './navi/navi.component';
import {FormsModule} from '@angular/forms';
import { ToDoStatusPrioPipe } from './to-do-status-prio.pipe';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToDoComponent } from './Modals/to-do/to-do.component';
import { ToDoSearchPipe } from './to-do-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NaviComponent,
    ToDoStatusPrioPipe,
    ToDoComponent,
    ToDoSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'de' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(localeDe, 'de');
