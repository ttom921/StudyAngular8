import { Component, OnInit } from '@angular/core';
import { FigA1Component } from '../feature/fig-a1/fig-a1.component';

@Component({
  selector: 'app-route-a',
  templateUrl: './route-a.component.html',
  styleUrls: ['./route-a.component.scss']
})
export class RouteAComponent implements OnInit {
  DycFigA = FigA1Component;
  constructor() { }

  ngOnInit() {
  }

}
