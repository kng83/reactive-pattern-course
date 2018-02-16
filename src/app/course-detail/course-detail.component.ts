import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';
import {CoursesService} from '../services/courses.service';
import {NewsletterService} from '../services/newsletter.service';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  // checemy uniknac babelkowania. Definiujemy nasze observable jako
  // stream observable
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  // dodajemy userService by wyswietlic imie uzytkownika
  // bierzemy stad newsLetterService
  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService,
              private userService: UserService) {


  }


  ngOnInit() {

    // teraz pruba rozbicia nested subscription
    // zrobimy teraz switchMap
    // dla kazdego elementu mozemy wykonac funckje
    // tu zaimplementowalismy course$ observable
    // i ona jest mapowana z inna observable (tak dziala switch map)
    // trick polega na tym ze bierzemy teraz wszystko jako observable
    // kurs brany jest z lekcji jaka observable
    // jezeli chcemy by observable byly tylko raz wysylane dajmy publish last
    // czyli switch map mapuje observable ale jesli w srodku ma inna observable
    // to najpierw ja konczy
    // first sluzy do emitowania pierwszej wartosci
    // switch map robi cancel poprzedniej subskrypcji

    this.course$ = this.route.params
      .switchMap(params => this.coursesService.findCourseByUrl(params['id']))
      .first()
      .publishLast().refCount()

    this.lessons$ = this.course$
      .switchMap(course => this.coursesService.findLessonsForCourse(course.id))
      .first()
      .publishLast().refCount()
  }

  // teraz login sie zmienia na John
  loginAsJohn() {
    this.userService.login('john@gmail.com', 'test123')
      .subscribe()
  }

}


// tak wygladala stara wersja z zagnieżdzonymi subscribe
// this.route.params
//   .subscribe(params => {
//
//     const courseUrl = params['id'];
//
//     this.coursesService.findCourseByUrl(courseUrl)
//       .subscribe(data => {
//         this.course = data;
//
//         this.coursesService.findLessonsForCourse(this.course.id)
//           .subscribe(lessons => this.lessons = lessons);
//       });
//
//   });
