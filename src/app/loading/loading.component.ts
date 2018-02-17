import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {NavigationStart, ResolveEnd, ResolveStart, Router, RoutesRecognized} from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {

  loading$: Observable<boolean>;
  // teraz sprawdzimy w routerze co umozliwi nam wyswietlenie tego loadingu
  // mozemy wzsiasc event bo on ma typ NavigationStart
  constructor(private router: Router) { }

  ngOnInit() {

    // to jest cwane jesli event routera ma typ navigationStart
    // to wyswietl ikone loading (a navigation start uruchamia sie szybciej
    // niz route resolver
    this.loading$ = this.router.events
      .map(event => {
         return event instanceof NavigationStart ||
                event instanceof ResolveStart
      })
  }

}
