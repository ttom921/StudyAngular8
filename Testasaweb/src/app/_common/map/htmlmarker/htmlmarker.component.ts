import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-htmlmarker',
  templateUrl: './htmlmarker.component.html',
  styleUrls: ['./htmlmarker.component.scss']
})
export class HTMLMarkerComponent implements OnInit {

  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
