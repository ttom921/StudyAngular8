import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, ValidatorFn, FormGroup, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
@Component({
  selector: 'app-test-dymcklistasync',
  templateUrl: './test-dymcklistasync.component.html',
  styleUrls: ['./test-dymcklistasync.component.scss']
})
export class TestDymcklistasyncComponent implements OnInit {

  ordersData = [];
  formModel: FormGroup;
  constructor(
    private fb: FormBuilder) {

    this.formModel = this.fb.group({
      orders: new FormArray([], minSelectedCheckboxes(1))
    });

    // async orders (could be a http service call)
    of(this.getOrders()).subscribe(orders => {
      this.ordersData = orders;
      this.addCheckboxes();
    });

    // // synchronous orders
    // this.ordersData = this.getOrders();
    // this.addCheckboxes();
  }

  addCheckboxes() {
    this.ordersData.forEach((o, i) => {
      const control = new FormControl(i === 0);// if first item set to true, else false
      (this.formModel.controls.orders as FormArray).push(control);
    });
  }
  getOrders() {
    return [
      { id: 100, name: 'order 1' },
      { id: 200, name: 'order 2' },
      { id: 300, name: 'order 3' },
      { id: 400, name: 'order 4' },
      { id: 500, name: 'order 5' },
    ]
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
