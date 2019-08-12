import { Component, OnInit } from '@angular/core';
import { FigA1Component } from '../feature/fig-a1/fig-a1.component';
import { RestApiService } from '../share/rest-api.service';
import { User } from '../share/user';
import { FigB1Component } from '../feature/fig-b1/fig-b1.component';

@Component({
  selector: 'app-route-a',
  templateUrl: './route-a.component.html',
  styleUrls: ['./route-a.component.scss']
})
export class RouteAComponent implements OnInit {
  DycFigA = FigA1Component;
  currentUser: User;
  constructor(private restApi: RestApiService, ) {

  }

  ngOnInit() {
    this.restApi.getUser("ttom").subscribe((data) => {
      this.currentUser = data[0];
      console.log(this.currentUser.username);
      console.log(this.currentUser.figs);
      if (this.currentUser.figs[1] === "figb") {
        this.DycFigA = FigB1Component;
      }
    });

  }

}
