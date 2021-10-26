import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AgentComponent} from './agent/agent.component';
import {OrderComponent} from './order/order.component';
import {ProductComponent} from './product/product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MessagesComponent} from './messages/messages.component';
import {CommonModule} from '@angular/common';
import {NavComponent} from './nav/nav.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    AgentComponent,
    OrderComponent,
    ProductComponent,
    MessagesComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
