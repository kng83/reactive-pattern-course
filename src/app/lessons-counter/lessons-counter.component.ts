import {Component, OnInit} from '@angular/core';
import {Lesson} from '../shared/model/lesson';
import {store} from '../event-bus-experiments/app-data';
import {Observer} from 'rxjs/Observer';

@Component({
  selector: 'lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements Observer<Lesson[]>, OnInit {


  lessonsCounter = 0;
  _self = this;

  constructor() {
  }


  ngOnInit() {

    console.log('lesson list component is registered as observer ..');

    store.lessonsList$.subscribe(this);


  }

  // next nie jest zbindowany z dana klasa
  // LessonsCounterComponent {unsubscribe: ƒ}
  // lessonsCounter:3
  // unsubscribe:ƒ ()
  // __proto__:LessonsCounterComponents

  next(data: Lesson[]) {
    console.log('counter component received data ..');
    console.log(data, 'here');
    this._self.lessonsCounter = data.length;
  };

  error(err: any) {
    console.log(err)
  };

  complete() {
    console.log('complete')
  }

}
