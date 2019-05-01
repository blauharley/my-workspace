import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {ShopComponent} from './components/shop/shop.component';
import {ShopcategoriyComponent} from './components/shopcategoriy/shopcategoriy.component';
import {ShoptypeComponent} from './components/shoptype/shoptype.component';
import {ShopthemeComponent} from './components/shoptheme/shoptheme.component';
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
  { path: 'category',
    component: ShopcategoriyComponent,
    children: [
      { path:"theme",
        component: ShopthemeComponent,
        outlet: 'myOutlet',
        children: [
          { path:"type/:id", component: ShoptypeComponent, outlet: 'myOutlet' }
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
