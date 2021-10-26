import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgentComponent} from './agent/agent.component';
import {HomeComponent} from './home/home.component';
import {ProductComponent} from './product/product.component';
import {OrderComponent} from './order/order.component';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'customer', component: AgentComponent},
  {path: 'orders', component: OrderComponent},
  {path: 'products', component: ProductComponent},
  {path: 'users', component: UserComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: '404', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
