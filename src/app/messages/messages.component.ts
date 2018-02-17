import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
 import 'rxjs/add/observable/of';
import {MessagesService} from '../services/messages.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {

 // wyswietlanie bledow u gory
  errors$: Observable<string[]>;

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    // tu implementujemy nasz service
    this.errors$ = this.messagesService.errors$;
  }

  close() {
    // aby skasowac error dajemy do serwisu pusta tablice
    this.messagesService.error();
  }

}
