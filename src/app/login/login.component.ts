import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // poniewaz chcemy nawigowac do strony startowej dajemy router
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {

  }

  login(email: string, password: string) {
    // tu bierzemy metode z serwisu
    this.userService.login(email , password)
      .subscribe(
        // jezeli login bedzie success to nawiguj do strony glownej
        () => {
          alert('Login successful');
          this.router.navigateByUrl('/home');
        },
        err => console.log(err)
      )
  }

}
