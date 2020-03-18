import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() value: number = 0;
  public circumference: number = 2 * Math.PI * 47
  public strokeDashoffset: number = 0
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['value']) {
      this.onPercentageChanged(changes['value'].currentValue);
    }
  }
  onPercentageChanged(val: number) {
    const offset = this.circumference - (val / 100) * this.circumference;
    this.strokeDashoffset = offset;

  }

}
