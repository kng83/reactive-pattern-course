import {Injectable} from '@angular/core';
import {User} from '../shared/model/user';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Http, Headers} from '@angular/http';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

// Patrz do gory bo to istotne jak teraz pobiera sie
// operator

export const UNKNOWN_USER: User = {
  firstName: 'Unknown',

}

@Injectable()
export class UserService {
// to bedzie statefull service poniewaz chcemy trzymac tu jakies
  // dane prezentacyjne uzytkownika np imie czy jest zalogowany czy nie
  // itd. Poniewaz service ma stan to bedzie zawsze zwracal UNKNONW_User
  // to juz jest skomentowane
  // user$: Observable<User> = Observable.of(UNKNOWN_USER);
  // implementujemy store i dajemy go z wartosci subjectu startowa

  private subject = new BehaviorSubject(UNKNOWN_USER);
  // tutaj traktujemy nasz subject jako observable
  // tu robimy pochodna subjectu tak by byla traktowana
  // jak observable aby ja rozglosic
  user$: Observable<User> = this.subject.asObservable();

  // damy tutaj inny servise
  constructor(private http: Http) {
  }

  // od razu robimy posta do servisu i dajemy skroty w obiekcie
  // zwaracamy tu observable dla componentu user
  login(email: string, password: string): Observable<User> {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // poniewaz musimy emitowac status naszego subjecta to dajemy go
    // do .od
    // czyli nasze do moze podobnie do subscribe w
    // najwazeniejszy jest subject next ktory nam emituje wartosc
    // https://blog.thoughtram.io/angular/2016/06/16/cold-vs-hot-observables.html
    // publishLast().refcount() will wait for the source observable to complete
    // and get the result.
    // any subscribers to the output observable will get the same data,
    // so this is a strategy for making sure the backend request is issued only once.
    // generalnie publish last wysle nam nowa wartosc bez cachingu
    // publishLas().refCount() = share(); !!!!!

    return this.http.post('/api/login', {email, password}, {headers: headers})
      .map(res => res.json())
      .do(user => console.log(user))
      .do(user => this.subject.next(user))
      .publishLast().refCount() // to sprawi ze ta funkcja bedzie wywolana tylko raz

  }
}
