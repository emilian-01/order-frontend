import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public navName = 'HOME';

  constructor() {
  }

  ngOnInit(): void {
  }

  logOut(): any {
    sessionStorage.clear();
    console.log('logded out');
    location.reload();
  }
}
