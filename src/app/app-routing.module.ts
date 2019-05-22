import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {ShopComponent} from './components/shop/shop.component';
import {RegexComponent} from './components/modals/regex/regex.component';

const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'shop',
    component: ShopComponent,
    canActivate: [AuthGuard],
    children: [
        { path: 'regExModal/:name', component: RegexComponent, outlet: 'regexpModal' },
    ]
  },
  { path: 'category', loadChildren: './modules/shop-module.module#ShopModuleModule' },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
