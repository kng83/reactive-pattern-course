import {dbData} from './db-data';
import * as _ from 'lodash';


export function lessonsRoute(req, res) {

  console.log(req.query);

  // fajne do wyszukiwania danych z bazy danych po url
  // pobranie naglowka url i rozszyfrowanie go
  const courseId = parseInt(req.query['courseId']) - 1,
    pageNumber = parseInt(req.query['pageNumber']),
    pageSize = parseInt(req.query['pageSize']);

  // wyliczanie odpowiedz (ktora strona kotry kurs

  const lessons = dbData[courseId].lessons;

  const start = (pageNumber - 1) * pageSize,
    end = start + pageSize;

  const lessonsPage = _.slice(lessons, start, end);

  res.status(200).json({payload: lessonsPage.map(buildLessonSummary)});

}

// buduje nam odpowiedz json
function buildLessonSummary({url, description, duration}, index) {
  return {
    url,
    description,
    seqNo: index,
    duration
  }
}

