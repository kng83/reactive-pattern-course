import * as _ from 'lodash';
import {Lesson} from '../shared/model/lesson';

// zmienilismy nazwe pliku z event-bus na app-data
// zrobilismy rozdzielenie na Observera ktory emituje nowe
// dane do observable ktory zglasza chec subscribe lu unsubscribe
export interface Observer {
  // zmieniamy terminologie
  next(data: any);
}

// tworzymy nowy interfejs Observable (to jest strumien danych z
// ktorego mozemy subskrybowac );
export interface Observable {
  subscribe(obs: Observer);

  unsubscribe(obs: Observer);
}

interface Subject extends Observer, Observable {
  // registerObserver na subscriber
  // unregisterObserver na unsubscribe
  // notifyObserver zmieniamy na next()
  // robimy ze subject ma ten sam interfejs co observer

}


// tworzymy nasza klase od nowa subject bedzie naszym event bus ale bedzie
// prywatny dla duzej czesci aplikacji
class SubjectImplementation implements Subject {
  // bedziemy mielie prywatna tablice Observers
  private observers: Observer[] = [];

  // tu wysylamy dane do wszystkich
  next(data: any) {
    this.observers.forEach(obs => obs.next(data))

  }

  subscribe(obs: Observer) {
    this.observers.push(obs);
    // odrazu wysylamy tak by uniknac opoznien
    // subskryber od razu otrzyma liste lekcji
    // teraz to ponizej przenosimy do store
    // obs.next(lessons);

  }

  unsubscribe(obs: Observer) {
    _.remove(this.observers, el => el === obs);

  }
}

// Poniewaz zdefiniowalismy jakis wzor to przypomina on store
// upychamy wszystko do klasy by lepiej pokazac
// mozemy to teraz ulepszyc i powiedziec ze Data store to observable

class DataStore implements Observable {
  private lessons: Lesson[] = [];

  private lessonsListSubject = new SubjectImplementation();


  // mozemy metody wziasc lessonList$
  subscribe(obs: Observer) {
    this.lessonsListSubject.subscribe(obs);
    // po subskrypcji emitujemy dane
    obs.next(this.lessons)
  }

  unsubscribe(obs: Observer) {
    this.lessonsListSubject.unsubscribe(obs)
  }

  initializeLessonsList(newList: Lesson[]) {
    this.lessons = _.cloneDeep(newList);
    // broadcast robi nam naszego next();
    this.broadcast();
  }

  // dodanie lekcji
  addLesson(newLesson: Lesson) {
    // aby te dane nie mutowaly na obiektu bierzemy kopie
    this.lessons.push(_.cloneDeep(newLesson));
    this.broadcast();
  }

  deleteLesson(deleted: Lesson) {
    _.remove(this.lessons,
      lesson => lesson.id === deleted.id)
    this.broadcast();
  }

  toggleLessonViewed(toggled: Lesson) {
    const lesson = _.find(this.lessons, lessonToggled => lessonToggled.id === toggled.id);
    lesson.completed = !lesson.completed;
    this.broadcast();
  }

  // poniewaz nie chcemy wysylac referencji do naszej lessons
  // robimy metode broadcast
  broadcast() {
    // wywlujemy next by rozglosic
    this.lessonsListSubject.next(_.clone(this.lessons));
  }

}

export const store = new DataStore();


// // zeby dane w naszej aplikacji wyswietlac robimy
// // observable
// // dollar na koncu znaczy ze to jest strumien danych
// // znaczy ze inne elementy moga subscrybowac z tej zmiennej
// // teraz musimy stworzyc nasza Observable bo jest undefinded
// // poniewaz musimy sie odniesc do naszy subscribe to budujemy
// // Subject
//
// const lessonsListSubject = new SubjectImplementation();
//
// export let lessonList$: Observable = {
//   subscribe: obs => lessonsListSubject.subscribe(obs),
//   unsubscribe: obs => lessonsListSubject.unsubscribe(obs)
// };
//
// // Tu bedzie stan naszej aplikacji tu damy wszystkie dane
// // lessons bedzie tutaj prywatna dla tego pliki
// let lessons: Lesson[] = [];
//
// // lessons mozemy inicjalizowac z zewnatrz
// // zrobimy tu glebokie klonowanie aby nie robic mutacji danych
// // nie zmienie sie ich wlasciciel
//
// export function initializeLessonsList(newList: Lesson[]) {
//   lessons  = _.cloneDeep(newList);
//   // tutaj teraz notyfikujemy dane
//   lessonsListSubject.next(lessons);
// }

