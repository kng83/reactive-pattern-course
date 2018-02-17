import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';
import {Observable} from 'rxjs';


@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  constructor(private route: ActivatedRoute) {
  }
  // kurs details stal sie teraz container component. wyswietla dane z
  // serwera po uwzglednieniu routingu

  ngOnInit() {
    // on juz nie bedzie rozglaszal danych bedzie on pobieral dane z resolvera
    // data w activated route to observable
    //  this.route.data
    // poniewaz nasz resolver w routs jest polaczony z detail tu bedziemy mieli te dane
    // odpowiedzia bedzie tuple ale my potrzebujemy tylko course a wiec [0]
    this.course$ = this.route.data.map(data => data['detail'][0])

    // a teraz bierzemy liste lekcji to z tupli nr 2
    this.lessons$ = this.route.data.map(data => data['detail'][1])
  }


}


// this.course$ = this.route.params
//   .switchMap(params => this.coursesService.findCourseByUrl(params['id']))
//   .first()
//   .publishLast().refCount();
//
// this.lessons$ = this.course$
//   .switchMap(course => this.coursesService.findLessonsForCourse(course.id))
//   .first()
//   .publishLast().refCount();
