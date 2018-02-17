import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class MessagesService {

  // do wysylania errorow robimy BehaviorSubject
  errorsSubject = new BehaviorSubject<string[]>([]);

  errors$: Observable<string[]> = this.errorsSubject.asObservable();

  constructor() {
    console.log('created MessagesService...');

  }

  // bo pojedynczy error nas interesuje
  // dzieki temu kazda czesc aplikacji ktora ma ten serwis bedzie mogla pobierac ten error
  error(...errors: string []) {
    this.errorsSubject.next(errors);

  }

}
