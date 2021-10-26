import {Component, OnInit} from '@angular/core';
import {Customer, CustomerForCreate} from '../agent/customer';
import {OrderService} from '../order.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {MessageService} from '../message.service';
import {User, UserForCreate} from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  users: User[];
  selectedUser: User;
  createNewVar: boolean;
  url = 'http://localhost:8000/user/';
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
          Authorization: 'token ' + sessionStorage.getItem('token')
        })
      };
      this.getIdByName(sessionStorage.getItem('username'));
      this.getUsers();
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  getUsers(): void {
    this.httpClient.get<any>(this.url, this.opts).subscribe(
      response => {
        this.users = response;
        this.users.sort((a, b) => a.id < b.id ? -1 : a.username > b.username ? 1 : 0);
        console.log(response);
      },
      error => console.log(error));
  }

  deleteUser(id): void {
    if (confirm('Are you sure to delete?')) {
      const url = `${this.url}${id}`;
      this.httpClient.delete(url, this.opts).subscribe(
        data => console.log(data),
        error => console.log(error)
      );
      location.reload();
    }
  }

  updateUser(user): void {
    const url = `${this.url}${user.id}/`;
    this.httpClient.put(url, this.selectedUser, this.opts).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    location.reload();
  }

  onSelect(user): void {
    this.selectedUser = user;
    // this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  onCreate(): void {
    this.createNewVar = true;
  }

  createUser(uname, email, pass): void {
    const newUser = new UserForCreate(uname, email, pass);
    const url = `${this.url}`;
    this.httpClient.post(url, newUser, this.opts).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    location.reload();
  }

  getIdByName(uname): number {
    if (this.users) {
      return this.users.find(el => {
        return el.username === uname;
      }).id;
    }
  }

}
