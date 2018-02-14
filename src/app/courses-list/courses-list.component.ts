import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../shared/model/course';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit {
  // ten component to nasz rozbity home component
  @Input() courses: Course[];
  constructor() { }

  ngOnInit() {
  }

}
