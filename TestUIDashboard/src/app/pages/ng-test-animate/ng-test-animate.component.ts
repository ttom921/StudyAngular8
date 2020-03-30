import { Component, OnInit } from '@angular/core';
import { AnimateCSSService } from 'src/app/_services/animate-css.service';

@Component({
  selector: 'app-ng-test-animate',
  templateUrl: './ng-test-animate.component.html',
  styleUrls: ['./ng-test-animate.component.scss']
})
export class NgTestAnimateComponent implements OnInit {
  loginfail = false;
  hide = true;
  constructor(
    private animateCSSService: AnimateCSSService
  ) { }

  ngOnInit() {

  }
  onSubmit(ev) {
    this.loginfail = true;
    // this.animateCSSService.animateCss('#myform', 'shake', () => {
    //   //console.log(this);
    //   this.loginfail = false;
    //   console.log("end shake animate");
    // });

    this.animateCSSService.animateCss('#myform', 'bounce', this.cbAnimateEnd);
  }
  cbAnimateEnd = () => {
    console.log(this);
    this.loginfail = false;
    console.log("end bounce animate");
  };

}
