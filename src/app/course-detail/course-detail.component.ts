import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';
import * as _ from 'lodash';


@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Course;
  lessons: Lesson[];

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {

    /*Tu mamy problem bo mamy nested subskrypcje
    * a bierzemy tylko parametry sciezki aby zindetyfikowac gdzie jestesmy
    * ten kod gdy mamy subskrypcje wielopoziomowe jest trudny aby go uzyc jeszcze
    * gdzies
    * */
      route.params
          .subscribe( params => {

              const courseUrl = params['id'];

              // gdy wezmiemy parametr sciezki to tutaj
            // wyszukujem dany kurs po sciezce
              this.db.list('courses', {
                  query: {
                      orderByChild: 'url',
                      equalTo: courseUrl
                  }
              })
              .map( data => data[0]) // tutaj mamy juz nasz kurs i pobieramy dane
              .subscribe(data => {
                // i tutaj trzymamy referencje do course
                  this.course = data;

                  this.db.list('lessons', {
                          query: {
                              orderByChild: 'courseId',
                              equalTo: data.$key
                          }
                      })
                      .subscribe(lessons => this.lessons = lessons);
              });

          });

  }

  ngOnInit() {

  }

}
