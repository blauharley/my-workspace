import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ShopcategoriyComponent} from '../components/shopcategoriy/shopcategoriy.component';
import {ShopthemeComponent} from '../components/shoptheme/shoptheme.component';
import {ShoptypeComponent} from '../components/shoptype/shoptype.component';
import {FormblockComponent} from '../components/shoptype/formblock/formblock.component';

const routes: Routes = [
  { path: 'overview',
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
  }
];

@NgModule({
  declarations: [FormblockComponent,ShopcategoriyComponent, ShopthemeComponent, ShoptypeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ShopModuleModule { }
