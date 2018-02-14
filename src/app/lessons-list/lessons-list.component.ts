import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from '../shared/model/lesson';


@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit {
  // usuwamy stary kod i impelementujemy na nowo

  @Input()
  lessons: Lesson[];

  ngOnInit() {

  }
}
