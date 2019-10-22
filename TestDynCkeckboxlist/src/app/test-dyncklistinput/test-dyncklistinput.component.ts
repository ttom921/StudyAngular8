import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
@Component({
  selector: 'app-test-dyncklistinput',
  templateUrl: './test-dyncklistinput.component.html',
  styleUrls: ['./test-dyncklistinput.component.scss']
})
export class TestDyncklistinputComponent implements OnInit {
  //事件資料
  eventDatas = [];
  formModel: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formModel = this.fb.group({
      events: new FormArray([])
    });

    // async orders (could be a http service call)
    of(this.getEvents()).subscribe(events => {
      this.eventDatas = events;
      //this.addCheckboxes();
      this.addCheckboexsGrp();
    });
  }
  createItem(): FormGroup {
    return this.fb.group({

    });
  }
  ngOnInit() {
  }

  onSubmit() {
    const selectedOrderIds = this.formModel.value.events
      .map((v, i) => {
        //console.log(this.eventDatas[i]);
        //console.log(v);
        this.eventDatas[i].is_check = v.evnck;
        this.eventDatas[i].event_name = v.evninp;
        return this.eventDatas[i];
      })
      .filter(v => {
        //console.log("filter->" + JSON.stringify(v))
        return v.is_check;
      })
      ;
    //  .map((v, i) => v ? this.eventDatas[i].is_check = v.evnck.is_check : null)
    //.filter(v => v.evnck.is_check === true);
    console.log(selectedOrderIds);
  }
  get fc_evninp() {
    return this.formModel.controls.events.get('evninp');
  }
  addCheckboexsGrp() {
    this.eventDatas.forEach((o, i) => {
      const grpcontrol = this.fb.group({
        evnck: [o.is_check],
        evninp: [{ value: o.event_name, disabled: !o.is_editable }, [Validators.required]]
      });
      (this.formModel.controls.events as FormArray).push(grpcontrol);
    });
  }
  // addCheckboxes() {
  //   this.eventDatas.forEach((o, i) => {
  //     const control = new FormControl(o.is_check);//
  //     (this.formModel.controls.events as FormArray).push(control);
  //   });
  // }
  getEvents() {
    return [
      { id: 1, event_name: "Event Alarm in 1", event_type: "EVT_ALARM_IN_1", is_editable: true, is_check: false },
      { id: 2, event_name: "Event Alarm in 2", event_type: "EVT_ALARM_IN_2", is_editable: true, is_check: true },
      { id: 3, event_name: "Event Alarm in 3", event_type: "EVT_ALARM_IN_3", is_editable: true, is_check: false },
      { id: 9, event_name: "EVT_IGNITION_ON", event_type: "EVT_IGNITION_ON", is_editable: false, is_check: false },
      { id: 10, event_name: "EVT_IGNITION_OFF", event_type: "EVT_IGNITION_OFF", is_editable: false, is_check: false },
    ]
  }
}
