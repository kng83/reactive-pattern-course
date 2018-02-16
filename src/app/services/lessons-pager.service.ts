import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Lesson} from '../shared/model/lesson';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Http} from '@angular/http';

@Injectable()
export class LessonsPagerService {
  // dajemy wyswietlanie  page size (czyli ilosc lekcji na strone na 2)
  private static readonly PAGE_SIZE = 2;

  // poniewaz chcemy zapamietac te nazwy damy behvioreSubject
  private subject = new BehaviorSubject<Lesson[]>([]);


  // jest pochodna subjectu
  lessonsPage$: Observable<Lesson[]> = this.subject.asObservable();

  currentPageNumber = 1;

  // id coursu
  private courseId: number;
  //
  // ladujemy serwis Http aby brac dane z backendu
  // sprawdzamy czy mamy rownieez 2 serwisy
  constructor(private http: Http) {
    console.log('lessonsPagerInstance created..');
  }

  loadFirstPage(courseId: number) {
    this.courseId = courseId;
    this.currentPageNumber = 1; // jakbysmy byli w innej czesci kursu tak zeby bylo 1

    this.loadPage(this.currentPageNumber);
  }

  previous() {

    if (this.currentPageNumber - 1 >= 1) {
      this.currentPageNumber -= 1;
      this.loadPage(this.currentPageNumber);
    }

  }

  next() {
    this.currentPageNumber += 1;
    this.loadPage(this.currentPageNumber);
  }

  loadPage(pageNumber: number) {
    // tworzenie sciezki z parametrami get
    // jest tam payload bo obiekt jest opakowany w payload
    return this.http.get('/api/lessons', {
      params: {
        courseId: this.courseId,
        pageNumber: pageNumber,
        pageSize: LessonsPagerService.PAGE_SIZE
      }
    })
      .map(res => res.json().payload)
      .subscribe(
        // emitujemy te lekcje bo inaczej nie bedziemy widziec
        // zmian
        lessons => this.subject.next(lessons)
      )

  }
}
