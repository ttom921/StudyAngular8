import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { CarEvent } from '../_models/car-event.model';

@Injectable({
  providedIn: 'root'
})
export class CarEventsService {


  constructor() { }
  Gets(): Observable<CarEvent[]> {
    return of(this.getTestData());
  }
  //以下是測試資料
  getTestData() {
    return [
      { "car_group": "ateam", "car_uid": "anum-1", "driver": "aname_1", "event_count": 1 },
      { "car_group": "ateam", "car_uid": "anum-2", "driver": "aname_2", "event_count": 2 },
      { "car_group": "ateam", "car_uid": "anum-3", "driver": "aname_3", "event_count": 3 },
      { "car_group": "ateam", "car_uid": "anum-4", "driver": "aname_4", "event_count": 4 },
      { "car_group": "btesm", "car_uid": "bnum-1", "driver": "bname_1", "event_count": 1 },
      { "car_group": "btesm", "car_uid": "bnum-2", "driver": "bname_2", "event_count": 2 },
      { "car_group": "btesm", "car_uid": "bnum-3", "driver": "bname_3", "event_count": 3 },
      { "car_group": "btesm", "car_uid": "bnum-4", "driver": "bname_4", "event_count": 4 },
      { "car_group": "btesm", "car_uid": "bnum-5", "driver": "bname_5", "event_count": 5 }]
  }
}
