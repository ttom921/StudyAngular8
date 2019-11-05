import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'html-marker',
  templateUrl: './htmlmarker.component.html',
  styleUrls: ['./htmlmarker.component.scss']
})
export class HTMLMarkerComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
  }

}
