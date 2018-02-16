import { Component, OnInit } from '@angular/core';
import {UNKNOWN_USER, UserService} from '../services/user.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  // tu spradzamy czy nasz uzytkownik jest zalogowany
  isLoggedIn$: Observable<boolean>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // tu sprawdzamy czy to unkown_user
    this.isLoggedIn$ = this.userService.user$
      .map(user => user !== UNKNOWN_USER)

  }

}
