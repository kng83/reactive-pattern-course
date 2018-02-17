import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import * as Cookies from 'cookies-js'

@Component({
  selector: 'create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})

// aby to uzyc musi byc reactive forms module
export class CreateLessonComponent implements OnInit {
  // nasza nazwa prywatnego ciastecza - draft- to wersja robocza, szkic
  private static readonly DRAFT_COOKIE = 'create-lesson-draft';

  form: FormGroup;


  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      description: ['', Validators.required],
      url: ['', Validators.required],
      longDescription: ['']
    });

  }

  ngOnInit() {
    // aby odczytac ciasteczko gdy uzytkownik wroci do formy robimy get
    const draft = Cookies.get(CreateLessonComponent.DRAFT_COOKIE);
    console.log(draft);

    if (draft) {
      // poniewaz sami zrobilismy json teraz go parsujem i dajemy do formy
      this.form.setValue(JSON.parse(draft));
    }


    // value changes w reactive forms wykrywa zmiany w formie
    // this.form.valueChanges.subscribe(console.log)

    // bedziemy emitowac forme jezeli bedzie valid
    // jezli jest valid to widzimy to w subscribe
    // dodajemy paczke ktora zapisuje cooki w przegladarce
    // yarn add cookie-js
    // jezeli wartosc jest prawidlowa zapiszemy ja do cookie
    // wartosc cookie zapiszemy w jsonie

    this.form.valueChanges
      .filter(() => this.form.valid)
      .do(validValue => Cookies.set(
        CreateLessonComponent.DRAFT_COOKIE, JSON.stringify(validValue)))
      .subscribe(console.log)

  }

}
