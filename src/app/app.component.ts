import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // @Input() loadedFeature='recipe' //@input() required?? 100% NOT!! bcoz app component cant recive data from its parent component
  // onNavigate(feature:string){
  //   this.loadedFeature=feature;
  // }
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
