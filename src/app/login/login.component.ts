import {Component, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  input;
  message: string;

  constructor(private router: Router,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.router.navigateByUrl('/home');
    }
    this.input = {
      username: '',
      password: ''
    };
  }

  onLogin(): any {
    this.orderService.loginUser(this.input).subscribe(
      response => {
        // console.log(typeof(response.token));
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('username', this.input.username);
        // console.log(sessionStorage.getItem('username'));
        // console.log('logged in');
        this.router.navigateByUrl('/home');
        // alert(this.input.username + ' logged in');
      }, error => {
        console.error(error);
        alert('couldn\'t log in');
      }
    );
  }

}
