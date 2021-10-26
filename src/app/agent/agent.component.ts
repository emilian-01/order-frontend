import {Component, OnInit} from '@angular/core';
import {Customer, CustomerForCreate} from './customer';
import {OrderService} from '../order.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {Router, RouterModule} from '@angular/router';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  customers: Customer[];
  selectedCustomer: Customer;
  createNewVar: boolean;
  url = 'http://localhost:8000/customer/';
  public items = [];
  opts: {};

  constructor(
    private orderService: OrderService,
    private httpClient: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.opts = {
        headers: new HttpHeaders({
          Authorization : 'token ' + sessionStorage.getItem('token')
        })
      };
      this.getCustomers();
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  getCustomers(): void {
    this.httpClient.get<any>(this.url, this.opts).subscribe(
      response => {
        this.customers = response;
        this.customers.sort((a, b) => a.id < b.id ? -1 : a.first_name > b.first_name ? 1 : 0);
        console.log(response);
      },
      error => console.log(error));
  }

  deleteCustomer(id): void {
    if (confirm('Are you sure to delete?')) {
      const url = `${this.url}${id}`;
      this.httpClient.delete(url, this.opts).subscribe(
        data => console.log(data),
        error => console.log(error)
      );
      location.reload();
    }
  }

  updateCustomer(customer): void {
    const url = `${this.url}${customer.id}/`;
    this.httpClient.put(url, this.selectedCustomer, this.opts).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    location.reload();
  }

  onSelect(customer): void {
    this.selectedCustomer = customer;
    // this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  onCreate(): void {
    this.createNewVar = true;
  }

  createCustomer(name, lname, cname): void {
    const newCustomer = new CustomerForCreate(name, lname, cname);
    const url = `${this.url}`;
    this.httpClient.post(url, newCustomer, this.opts).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    location.reload();
  }
}
