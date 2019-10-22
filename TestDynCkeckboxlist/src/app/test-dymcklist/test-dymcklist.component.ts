import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, ValidatorFn, NgControlStatus } from '@angular/forms';

@Component({
  selector: 'app-test-dymcklist',
  templateUrl: './test-dymcklist.component.html',
  styleUrls: ['./test-dymcklist.component.scss']
})
export class TestDymcklistComponent implements OnInit {


  ordersData = [
    { id: 100, name: 'order 1' },
    { id: 200, name: 'order 2' },
    { id: 300, name: 'order 3' },
    { id: 400, name: 'order 4' },
    { id: 500, name: 'order 5' },
  ];
  formModel: FormGroup;
  constructor(
    private fb: FormBuilder) {

    this.formModel = this.fb.group({
      orders: new FormArray([], minSelectedCheckboxes(1))
    });
    this.addCheckboxes();
  }

  addCheckboxes() {
    this.ordersData.forEach((o, i) => {
      const control = new FormControl(i === 0);// if first item set to true, else false
      (this.formModel.controls.orders as FormArray).push(control);
    });
  }
  ngOnInit() {
  }
  onSubmit() {
    const selectedOrderIds = this.formModel.value.orders
      .map((v, i) => v ? this.ordersData[i].id : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }

}
function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (fromArray: FormArray) => {
    const totalSelected = fromArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);
    return totalSelected >= min ? null : { require: true };
  }
  return validator;
}
