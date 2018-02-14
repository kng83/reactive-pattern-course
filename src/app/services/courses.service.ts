import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Course} from '../shared/model/course';
import {Observable} from 'rxjs/Observable';
import {Lesson} from '../shared/model/lesson';

@Injectable()
export class CoursesService {

  constructor(private db: AngularFireDatabase) {
  }

// Wlasciwie w stateless aplication nie chcemy zwracac wartosci
  // chcemy zwrocic observable
  // Mamy teraz longLife observable czyli jak cos sie zmieni na serwerze
  // to my to od razu widzimy (to nie jest czasmi to o co nam chodzi)
  // aby tego uniknac to dajemy metode first do observable(tylko 1 odczyt)
  // inczej musielibysmy zrobic unsubscribe

  findAllCourses(): Observable<Course[]> {
    // odwolanie do sciezki (do obiektu lesson w firebase)
    // orderByKey ze porzadkuje wedlug klucza firebase
    // limit okresla ze bierzemy ostatnie kursy
    return this.db.list('courses')
      .first()
      .do(console.log);
  }

  findLatestLessons(): Observable<Lesson[]> {
    // odwolanie do sciezki (do obiektu lesson w firebase)
    // orderByKey ze porzadkuje wedlug klucza firebase
    // limit okresla ze bierzemy ostatnie kursy
    // tu niesubskrybujemy tyko zwaracamy observable
    // alternatywa dla first jest .take(1)
    return this.db.list('lessons', {
      query: {
        orderByKey: true,
        limitToLast: 10
      }
    })
      .first()
      .do(console.log);
  }

  // pobieramy sciezke url kursu zwracamy jego jedna wartosc
  // dostajemy z tego tablice z jednym polem i bierzemy te jedno pole
  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.list('courses', {
      query: {
        orderByChild: 'url',
        equalTo: courseUrl
      }
    })
      .first()
      .map(data => data[0]) // tutaj mamy juz nasz kurs i pobieramy dane
  }

  findLessonsForCourse(courseId: string): Observable<Lesson[]> {
    return this.db.list('lessons', {
      query: {
        orderByChild: 'courseId',
        equalTo: courseId
      }
    })
      .first();
  }
}
