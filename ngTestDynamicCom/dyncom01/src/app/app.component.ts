import { Component } from '@angular/core';
import { HelloComponent } from './hello/hello.component';
import { FigA1Component } from './feature/fig-a1/fig-a1.component';
import { FigB1Component } from './feature/fig-b1/fig-b1.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dyncom01';
  Hello = HelloComponent;
  /**
   * name
   */
  public showfig(compname: string) {
    console.log("showfig:" + compname);
    switch (compname) {
      case "figa1":
        this.Hello = FigA1Component;
        break;
      case "figb1":
        this.Hello = FigB1Component;
        break;

      default:
        break;
    }
  }
}
