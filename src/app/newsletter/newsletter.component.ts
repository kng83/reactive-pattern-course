import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {NewsletterService} from '../services/newsletter.service';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs/Observable';

// zmieniamy tu strategie na onPush. Iak bedzie zmiana na inputach to bedzie
// on wyrenderowany
@Component({
  selector: 'newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterComponent implements OnInit {

  // jak damy normalen firstName to po zmianach nie bedzie zmiany
  // musimy dac observable

  firstName$: Observable<string>;

  constructor(private newsletterService: NewsletterService,
              private userService: UserService) {

  }

  ngOnInit() {
    // tutaj przepisujem firstNama do observable firstName$
    this.firstName$ = this.userService.user$
      .map(user => user.firstName)
  }

  subscribeToNewsletter(emailField) {
    this.newsletterService.subscribeToNewsletter(emailField.value)
      .subscribe(
        () => {
          emailField.value = ''; // aby wyczyscic pole
          alert('Subscription successful ...');
        },
        console.error // mozemy tak dac bo to referencja do erroru
      );
  }


}
