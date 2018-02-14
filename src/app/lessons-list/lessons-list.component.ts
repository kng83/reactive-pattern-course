import {Component, OnInit} from '@angular/core';
import {Lesson} from '../shared/model/lesson';
import {store} from '../event-bus-experiments/app-data';
import {Observer} from 'rxjs/Observer';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})

// Observera mozemy zobaczyc wchodzac na jego typ (interfejs ma jeszcze error i complete
export class LessonsListComponent implements Observer<Lesson[]>, OnInit {


  lessons: Lesson[] = [];

  ngOnInit() {
    store.lessonsList$.subscribe(this);
  }

  // zmiana na fat arrow pomogla
  next = (data: Lesson[]) => {
    console.log('Lessons list component received data ..');
    this.lessons = data;
  }

  error(err: any) {console.log(err)}
  complete() {console.log('completed')}

  toggleLessonViewed(lesson: Lesson) {
    console.log('toggling lesson ...');
    store.toggleLessonViewed(lesson);
  }

  delete(deleted: Lesson) {
    store.deleteLesson(deleted);
  }


}



