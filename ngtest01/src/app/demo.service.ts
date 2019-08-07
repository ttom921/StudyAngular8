import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  protected value = "Hi Clover";
  constructor() { }

  getValue() { return this.value; }
  setValue(value: string) { this.value = value; }

  getObservableValue() { return of("observable Clover"); }
  getPromiseValue() { return Promise.resolve("promise value"); }
}
