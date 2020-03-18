import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-progress-bars',
  templateUrl: './angular-progress-bars.component.html',
  styleUrls: ['./angular-progress-bars.component.scss']
})
export class AngularProgressBarsComponent implements OnInit {
  progress = 0;
  constructor() { }

  ngOnInit() {
    setInterval(() => {
      if (this.progress >= 100) {
        this.progress = 0;
      } else {
        this.progress++;
      }
      //console.log(this.progress);
    }, 1000);
  }

}
