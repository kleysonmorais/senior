import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) { }

  navigate(profile: string) {
    localStorage.setItem('profile', profile)
    this.router.navigate([`home/${profile}`]);
  }

}
