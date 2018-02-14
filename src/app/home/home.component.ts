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
  courses$: Observable<Course[]>;
  latestLessons$: Observable<Lesson[]>;

  constructor(private coursesService: CoursesService) {

  }

  /*Wady tego rozwiazania to ze zawsze manualnie bierzemy
  * dane z servera i trzymamy lokalne referencje do bazy
  * danych
  * Terazz zeby przypisac strumenie do observable przypisujemy je
  * definiujemy strumien danych patrz komentarz na dole
  * musimy tylko zmienic jeszcze nasze template*/

  ngOnInit() {
    this.courses$ = this.coursesService.findAllCourses();

    this.latestLessons$ = this.coursesService.findLatestLessons();
  }
}
// to usuwamy zeby zrobic reactive style
// this.coursesService.findAllCourses()
//   .subscribe(
//     data => this.courses = data
//   );
//
// this.coursesService.findLatestLessons()
//   .subscribe(
//     data => this.latestLessons = data
//   );
// }

