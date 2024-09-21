import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy  {
  
  constructor(
  ) {
  }

//call initial phase
  ngOnInit() {
  }

  ngAfterViewInit() {
  }


  ngOnDestroy(): void {
    
  }

  


}
