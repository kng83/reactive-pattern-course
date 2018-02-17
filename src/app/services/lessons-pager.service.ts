import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {Lesson} from '../shared/model/lesson';
import {Http} from '@angular/http';

@Injectable()
export class LessonsPagerService {

  private static readonly PAGE_SIZE = 2;

  private subject = new BehaviorSubject<Lesson[]>([]);

  lessonsPage$: Observable<Lesson[]> = this.subject.asObservable();

  currentPageNumber = 1;

  private courseId: number;


  constructor(private http: Http) {
    console.log('LessonsPagerService instance created ..');
  }

// dodajemy tutaj zwracana observable aby wylapac error

  loadFirstPage(courseId: number): Observable<any> {
    this.courseId = courseId;
    this.currentPageNumber = 1;
    return this.loadPage(this.currentPageNumber);
  }

  previous(): Observable<any> {
    if (this.currentPageNumber - 1 >= 1) {
      this.currentPageNumber -= 1;

    }
    return this.loadPage(this.currentPageNumber);
  }

  next(): Observable<any> {
    this.currentPageNumber += 1;
    return this.loadPage(this.currentPageNumber);
  }

// poniewaz mamy losowe errory (robimy je sztucznie
// na serverze) mozemy je zlapac zmieniamy to
  // mozemy zlapac w ten sposob error z backend'u
  // jesli subject dostanie pierwszy error nie mozemy dalej
  // emitowac danych. Usuwamy subscribe bo zwracamy observable
  // do uzyjemy do emitowania lessons z backendu
  // przciwko wielokrotnej subskrypcji .publishLast

  loadPage(pageNumber: number): Observable<any> {
    return this.http.get('/api/lessons', {
      params: {
        courseId: this.courseId,
        pageNumber,
        pageSize: LessonsPagerService.PAGE_SIZE
      }
    })
      .map(res => res.json().payload)
      .do(lessons => this.subject.next(lessons))
      .publishLast().refCount();

  }

}

// to bylo subskrybowane
// //   .subscribe(
// lessons => this.subject.next(lessons),
// // err => this.subject.error(err) to rozwiaznie nie dziala dobrze
// );












