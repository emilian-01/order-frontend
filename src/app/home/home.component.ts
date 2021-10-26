import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    }
  }


}
