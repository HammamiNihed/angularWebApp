import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root', //component directive
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-blog-dashboard';

  
  constructor() {}

  
  ngOnInit(): void {
   
  }

 
}
