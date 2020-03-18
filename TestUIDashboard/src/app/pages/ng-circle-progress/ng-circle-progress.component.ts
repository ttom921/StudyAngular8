import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-circle-progress',
  templateUrl: './ng-circle-progress.component.html',
  styleUrls: ['./ng-circle-progress.component.scss']
})
export class NgCircleProgressComponent implements OnInit {
  //@ViewChild('circlepg', { static: false }) circlepg: MatSidenavContent;
  constructor() { 
    //console.log(circle-progress);
  }

  ngOnInit() {
  }
  // subtitleFormat callback example
  formatSubtitle = (percent: number) : string[] => {
  if(percent >= 100){
    return ["Congratulations!"]
  }else if(percent >= 50){
    return ["hard","Half"]
  }else if(percent > 0){
    return ["Just began"]
  }else {
    return ["Not started"]
  }
}
  
}
