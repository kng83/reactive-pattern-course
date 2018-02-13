import {Component, OnInit} from '@angular/core';
import {Lesson} from '../shared/model/lesson';
import * as _ from 'lodash';
import {Observer, store} from '../event-bus-experiments/app-data';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer, OnInit {

  // to tutaj moze zostac bo to tylko bedzie nam wyglad template robilo
  lessons: Lesson[] = [];

  ngOnInit() {
    console.log('lesson list component is registered as observer ..');
    // Observer jest wlasciwie komponentem
    // tu zglaszamy observatora
    // mozemy to dac do OnInit bo nie sa to dane synchroniczne
    // jak w event loop
    store.subscribe(this);
  }

  // tu przychodza dane  z app-data.ts
  next(data: Lesson[]) {
    console.log('Lessons list component received data ..');
    // nie musimy tu roblic slice ani deep copy bo mamy to w sore
    this.lessons = data;
  }

  toggleLessonViewed(lesson: Lesson) {
    console.log('toggling lesson ...');
    store.toggleLessonViewed(lesson);
  }

  delete(deleted: Lesson) {
    store.deleteLesson(deleted);
  }


}



