import {Component, OnInit} from '@angular/core';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';
import {CoursesService} from '../services/courses.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // zeby bylo reactive style
  // to zmeniamy nasze courses zmieniamy je na observables
  // rola teraz homeComponets jes rozdzielenie strumienia danych
  // i prezentacja dwoch komponentow wenatrz
  // to jest tak zwany SmartComponent

  courses$: Observable<Course[]>;
  latestLessons$: Observable<Lesson[]>;

  constructor(private coursesService: CoursesService) {

  }


  ngOnInit() {
    this.courses$ = this.coursesService.findAllCourses();
    this.latestLessons$ = this.coursesService.findLatestLessons();
  }
}


