import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {Lesson} from '../shared/model/lesson';
import {CoursesHttpService} from '../services/courses-http.service';
import {Course} from '../shared/model/course';
import {LessonsPagerService} from '../services/lessons-pager.service';
import {MessagesService} from '../services/messages.service';


// dodajemy tutaj servis lokalny messages
// i on nadpisze global servis ktory jest na samej gorze dolaczony
@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [LessonsPagerService , MessagesService]
})
export class CourseComponent implements OnInit, OnDestroy {

  @Input()
  id: number;

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  detail$: Observable<Lesson>;

  constructor(private coursesService: CoursesHttpService,
              private lessonsPager: LessonsPagerService,
              private  messagesService: MessagesService) {

  }

  // tu lapiemy bledy na etapie komponentow

  ngOnInit() {
    this.course$ = this.coursesService.findCourseById(this.id);
    this.lessons$ = this.lessonsPager.lessonsPage$;

    // tu sprawdzamy error zamiast tego allertu wywolujemy
    // nasz obiekt erroru
    this.lessonsPager.loadFirstPage(this.id)
      .subscribe(
        () => {},
        err => this.messagesService.error('Could not load first Page')
      );

  }

  previousLessonsPage() {
    this.lessonsPager.previous()
      .subscribe(
        () => {},
        err =>  this.messagesService.error('Could not load  previous Previous')
      )
  }

  nextLessonsPage() {
    this.lessonsPager.next()
      .subscribe(
        () => {},
        err =>  this.messagesService.error('Could not load next Page')
      )
  }

  selectDetail(lesson: Lesson) {
    this.detail$ = this.coursesService.findLessonDetailById(lesson.url);
  }

  backToMaster() {
    this.detail$ = undefined;
  }

  ngOnDestroy() {
    console.log('destroying CourseComponent ...');
  }

}








