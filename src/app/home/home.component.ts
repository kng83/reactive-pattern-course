import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses: Course[];
  latestLessons: Lesson[];

  constructor(private db: AngularFireDatabase) {

  }
  /*Wady tego rozwiazania to ze zawsze manualnie bierzemy
  * dane z servera i trzymamy lokalne referencje do bazy
  * danych
  * */

  ngOnInit() {
    // pobieranie list jest przez operator list z firebase
    // w firebase jest galaz(obiekt) courese
    // operato posredni do (pozwala nam wykonca jakas referencje
    // do funckji i przekazuje do niej dane

    this.db.list('courses')
      .do(console.log)
      .subscribe(
        data => this.courses = data
      );
    // odwolanie do sciezki (do obiektu lesson w firebase)
    // orderByKey ze porzadkuje wedlug klucza firebase
    // limit okresla ze bierzemy ostatnie kursy
    this.db.list('lessons', {
      query: {
        orderByKey: true,
        limitToLast: 10
      }
    })
      .do(console.log)
      .subscribe(
        data => this.latestLessons = data
      );
  }

}
