// tworzymy nowy plik
// bedziemy implementowac ladowanie modulow jezeli sie dane zaladowaly
// resolver nalezy do angular routera dajemy mu typy ktore beda ladowaly pod
// strony gdy zaladuja sie dane w course-detail mamy lessons$ i courses$
// tutaj typ to tuple. Zeby ten typ dzialal lesson[] musimy dac w nawias
// odpowiedzia bedzie tuple ktorej pierwszym elementem bedzie course a drugi lesson[]
// Musimy go dac do app.module jak provider i do rotera
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Lesson} from '../shared/model/lesson';
import {Course} from '../shared/model/course';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {CoursesService} from '../services/courses.service';
import 'rxjs/add/operator/switchMap';


// to jest serwis implementowany na drogach
// dane sa pobierane z trasy rutingu przekazywane sa do nich dane z serwera
// i wyswietlana jest strona juz z danymi z serwera po pobraniu  wszystkich
// wartosci

@Injectable()
export class CourseDetailResolver implements Resolve<(Course | Lesson[])[]> {

  // przenieslismy courseService z course-detail tutaj
  constructor(private courseService: CoursesService) {

  }


  resolve(
    // tu bedziemy mieli id bo w ruterze jes 'course/:id' a to jest snapshot
    // nie mozemy tylko findeCourse zwarac bo typem zwracanym jest touple
    // dlatego musimy zrobic switch map
    // ale to samo tez nie bedzie dzialac bo bedziemy mieli tylko Lesson[] z mapa
    // ten map jako drugi parametr robi callback zwartosciaami pierwszego i drugiego
    // subskryboania . Musialem dodac moj typ

          route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot
  ):  Observable<(Course | Lesson[])[]> |
    [Course, Lesson[]]  | Promise<[Course, Lesson[]]> {

    return this.courseService.findCourseByUrl(route.params['id'])
      .switchMap((course) => this.courseService.findLessonsForCourse(course.id),
        (course, lessons) => {return [course, lessons]})
  }


}
