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
    this.animateCSSService.animateCss('#myform', 'shake');
    //this.animateCSS('#myform', 'shake');
  }
  // animateCSS(element, animationName, callback?) {
  //   const node = document.querySelector(element)
  //   node.classList.add('animated', animationName)

  //   function handleAnimationEnd() {
  //     //console.log("animationend");
  //     node.classList.remove('animated', animationName)
  //     node.removeEventListener('animationend', handleAnimationEnd)

  //     if (typeof callback === 'function') callback()
  //   }

  //   node.addEventListener('animationend', handleAnimationEnd)
  // }
}
