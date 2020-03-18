import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-svgbar',
  templateUrl: './svgbar.component.html',
  styleUrls: ['./svgbar.component.scss']
})
export class SvgbarComponent implements OnInit {

  @Input() value: number = 0;
  constructor() { }

  ngOnInit() {
  }

}
