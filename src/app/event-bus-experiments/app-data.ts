import * as _ from 'lodash';
import {Lesson} from '../shared/model/lesson';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Observer} from 'rxjs/Observer';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

class DataStore {
  // Poniewaz beheviorSubject pamieta nasze wartosci nie potrzbujemy
  // tablicy
  // private lessons: Lesson[] = [];

  // Subject ma te meto1dy subscribe i unsubscribe
  // odpowiedz jest taka ze nasz Subject nie pamieta
  // ostatniej wartosc (wtydy dawlismy next)
  // musimy uzyc innego Subject => BehavioreSubject
  // pamieta ostatnia wartosc
  private lessonsListSubject = new BehaviorSubject<Lesson[]>([]);

  // Observable emituje lekcje wiec taki bedzie miala typ
  // to byl nasz subsciber .lesson list bedzie emitowala nasz subject ale
  // on jest trzymany prywatnie
  public lessonsList$: Observable<Lesson[]> = this.lessonsListSubject.asObservable();

  initializeLessonsList(newList: Lesson[]) {
    this.lessonsListSubject.next(_.cloneDeep(newList));
  }

  addLesson(newLesson: Lesson) {
    // bierzemy tu kopie , wpychamy nowy element i wywloujemy u obserwatorow next
    const lessons = this.cloneLessons();
    lessons.push(_.cloneDeep(newLesson));
    // i tu robimy broadcast do wszystkich obserwatorow
    this.lessonsListSubject.next(lessons);
  }

  deleteLesson(deleted: Lesson) {
    const lessons = this.cloneLessons();
    _.remove(lessons, lesson => lesson.id === deleted.id);
    this.lessonsListSubject.next(lessons);
  }

  toggleLessonViewed(toggled: Lesson) {
    const lessons = this.cloneLessons();
    const lesson = _.find(lessons, lessonToggle => lessonToggle.id === toggled.id);
    lesson.completed = !lesson.completed;
    this.lessonsListSubject.next(lessons);

  }

  // poniewaz lessonsListSubject trzyma nasza wartosc mozemy z niego
  // zrbic kopie lekcji
  private cloneLessons() {
    return _.cloneDeep(this.lessonsListSubject.getValue());
  }

  // broadcast() {
  //   this.lessonsListSubject.next(_.cloneDeep(this.lessons));
  // }
}

export const store = new DataStore();







