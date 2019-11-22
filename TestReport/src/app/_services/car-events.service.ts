import { Injectable } from '@angular/core';
import { of, Observable, from } from 'rxjs';
import { CarEvent } from '../_models/car-event.model';
import { Source } from 'webpack-sources';

@Injectable({
  providedIn: 'root'
})
export class CarEventsService {


  constructor() { }
  Gets(): Observable<CarEvent[]> {
    return of(this.getTestData());
  }
  GetBars(): Observable<any> {
    let obj = this.getTestBarData();
    return of(obj);
  }
  GetDriversBar(): Observable<any> {
    let obj = this.getTestDriverData();
    return of(obj);
  }
  GetTeamFuelConLine(): Observable<any> {
    let obj = this.getTestTeamFuelConData();
    return of(obj);
  }
  //以下是測試資料
  private getTestTeamFuelConData() {
    let linechardata = {
      title: "車隊油秏統計",
      source: {
        month: ["1月", "2月", "3月", "4月", "5月", "6月"],
        'ateam': [20, 20, 30, 100, 30, 40],
        'bteam': [20, 30, 50, 80, 10, 10],
        'cteam': [10, 25, 35, 100, 40, 50]
      }
    }
    return linechardata;
  }
  private getTestDriverData() {
    let linechardata = {
      title: "駕駛人事件統計",
      source: {
        month: ["1月", "2月", "3月", "4月", "5月", "6月"],
        tom: [2, 2, 3, 10, 3, 4],
        jack: [2, 3, 5, 8, 1, 1],
        allen: [2, 2, 3, 10, 3, 4]
      }
    }
    return linechardata;
  }
  private getTestBarData() {
    let linechardata = {
      title: "車輛事件統計",
      source: {
        month: ["1月", "2月", "3月", "4月", "5月", "6月"],
        'hs-8888': [2, 2, 3, 10, 3, 4],
        'hs-7777': [2, 3, 5, 8, 1, 1],
        'hs-6666': [2, 2, 3, 10, 3, 4]
      }
    }
    return linechardata;
  }
  private getTestData() {
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
