import {Component, OnInit} from '@angular/core';
import {Product, ProductCategory} from '../product/product';
import {OrderService} from '../order.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../message.service';
import {Counter, Order, OrderForCreate, OrderUnits, OUnits} from './order';
import {Customer} from '../agent/customer';
import {Router} from '@angular/router';
import {User} from '../user/user';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  customers: Customer[];
  orders: Order[];
  users: User[];
  products: Product[];
  selectedUnits: OrderUnits[];
  getAllOrderUnits: OUnits[];
  orderUnitsForCreate: OrderUnits[];
  orderUnitsForUpdate: OrderUnits[];
  newOrder: OrderForCreate;
  selectedOrder: Order;
  createNewVar: boolean;
  selectedCust: number;
  counter: number;
  currUser: string;
  orderUnit: OrderUnits;
  url = 'http://localhost:8000/';
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
          Authorization: 'token ' + sessionStorage.getItem('token')
        })
      };
      this.getOrders();
      this.currUser = sessionStorage.getItem('username');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  getOrders(): void {
    this.httpClient.get<any>(this.url + `order/`, this.opts).subscribe(
      response => {
        this.orders = response;
        this.orders.sort((a, b) => a.id < b.id ? -1 : a.code > b.code ? 1 : 0);
        console.log(response);
      },
      error => console.log(error));

    this.httpClient.get<any>(this.url + `customer/`, this.opts).subscribe(
      response => {
        this.customers = response;
        this.customers.sort((a, b) => a.id < b.id ? -1 : a.first_name > b.last_name ? 1 : 0);
        console.log(response);
      },
      error => console.log(error));

    this.httpClient.get<any>(this.url + `product/`, this.opts).subscribe(
      response => {
        this.products = response;
        this.products.sort((a, b) => a.id < b.id ? -1 : a.name > b.name ? 1 : 0);
        console.log(response);
      },
      error => console.log(error));

    this.httpClient.get<Counter>(this.url + `counter/`, this.opts).subscribe(
      response => {
        this.counter = response[0].value + 1;
        console.log(response);
      },
      error => console.log(error));

    this.httpClient.get<OUnits[]>(this.url + `orderunit/`, this.opts).subscribe(
      response => {
        this.getAllOrderUnits = response;
        this.getAllOrderUnits.sort((a, b) => a.id < b.id ? -1 : a.order > b.order ? 1 : 0);
        console.log(response);
      },
      error => console.log(error));

    this.httpClient.get<any>(this.url + `user/`, this.opts).subscribe(
      response => {
        this.users = response;
        console.log(response);
      },
      error => console.log(error));
  }

  getPriceById(id): any {
    if (this.products && id) {
      return this.products.find(el => {
        return el.id === id;
      }).default_price;
    }
  }

  getCustomerById(id): string {
    if (this.customers) {
      return this.customers.find(el => {
        return el.id.toString() === id.toString();
      }).first_name + ' ';
    }
  }

  getCreatorById(id): string {
    if (this.users) {
      return this.users.find(el => {
        return el.id.toString() === id.toString();
      }).username + ' ';
    }
  }

  getIdByName(uname): number {
    if (this.users) {
      return this.users.find(el => {
        return el.username === uname;
      }).id;
    }
  }

  deleteOrder(id): void {
    if (confirm('Are you sure to delete?')) {
      const url = `${this.url}order/${id}/`;
      console.log(this.url);
      this.httpClient.delete(url, this.opts).subscribe(
        data => console.log(data),
        error => console.log(error)
      );
      for (const u of this.getAllOrderUnits) {
        if (u.order === id) {
          this.deleteUnit(u.id);
        }
      }
      location.reload();
    }
  }

  deleteUnit(id): void {
    const url = `${this.url}orderunit/${id}/`;
    console.log(this.url);
    this.httpClient.delete(url, this.opts).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    location.reload();
  }

  updateOrder(): void {
    let putVar = false;
    for (const u of this.orderUnitsForUpdate) {
      putVar = false;
      for (const un of this.getAllOrderUnits) {
        if (u.id === un.id) {
          putVar = true;
        }
      }
      if (putVar) {
        const url = `${this.url}orderunit/${u.id}/`;
        this.httpClient.put(url, u, this.opts).subscribe(
          data => console.log(data),
          error => console.log(error)
        );
      } else {
        // post order units
        const url = `${this.url}orderunit/`;
        this.httpClient.post(url, u, this.opts).subscribe(
          data => console.log(data),
          error => console.log(error)
        );
      }
    }
    location.reload();
  }

  onSelect(order): void {
    this.selectedOrder = order;
    this.orderUnitsForUpdate = [];
    for (const u of this.getAllOrderUnits) {
      if (u.order === this.selectedOrder.id) {
        this.orderUnitsForUpdate.push(u);
      }
    }
    // this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  onCreate(): any {
    if (!this.createNewVar) {
      this.createNewVar = true;
    }
    const codeYear = new Date().getFullYear();
    this.newOrder = new OrderForCreate(this.counter, codeYear, new Date(),
      this.getIdByName(sessionStorage.getItem('username')));
    this.orderUnitsForCreate = [];
    this.orderUnit = new OrderUnits(this.counter);
    this.orderUnitsForCreate.push(this.orderUnit);
  }

  getNewOrderUnit(orderID): any {
    return new OrderUnits(orderID);
  }

  saveOrder(): void {
    // post order data
    this.newOrder.customer = this.selectedCust;
    let url = `${this.url}order/`;
    this.httpClient.post(url, this.newOrder, this.opts).subscribe(
      data => console.log(data),
      error => console.log(error)
    );

    // increment and post counter
    url = `${this.url}counter/1/`;
    const cnt = new Counter(this.newOrder.code);
    this.httpClient.put(url, cnt, this.opts).subscribe(
      data => console.log(data),
      error => console.log(error)
    );

    for (const u of this.orderUnitsForCreate) {
      console.log(u.toString());

      // post order units
      url = `${this.url}orderunit/`;
      this.httpClient.post(url, u, this.opts).subscribe(
        data => console.log(data),
        error => console.log(error)
      );
    }
    location.reload();
  }
}
