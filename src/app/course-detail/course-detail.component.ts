import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';
import {CoursesService} from '../services/courses.service';


@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

   course: Course;
  lessons: Lesson[];

  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService) {

    /*Tu mamy problem bo mamy nested subskrypcje
    * a bierzemy tylko parametry sciezki aby zindetyfikowac gdzie jestesmy
    * ten kod gdy mamy subskrypcje wielopoziomowe jest trudny aby go uzyc jeszcze
    * gdzies
    * */
    route.params
      .subscribe(params => {

        const courseUrl = params['id'];
        console.log(courseUrl);
        this.coursesService.findCourseByUrl(courseUrl)
          .subscribe((data) => {
            console.log(data, 'sub');
            this.course = data;

            this.coursesService.findLessonsForCourse(this.course.id)
              .subscribe(lessons => {
                console.log(lessons, 'here');
                this.lessons = lessons;
              });
          });



      });
  }

  ngOnInit() {

  }

}
