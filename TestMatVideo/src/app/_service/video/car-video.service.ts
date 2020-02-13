import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarVideoService {
  //api = `${environment.apiUrl}/users`;
  constructor() { }

  Get(carid) {
    //let url = `${this.api}?userid=${data.id}`;
    console.log("carid=" + carid);
    let datas = this.TestFakeData();
    return of(datas);
  }
  TestFakeData() {
    let data = [
      {
        src: "https://www.w3schools.com/html/mov_bbb.mp4#t=0.5"
      },
      {
        src: "https://nkoehler.github.io/mat-video/assets/NASA.mp4"
      },
      {
        src: "http://static.videogular.com/assets/videos/videogular.mp4#t=1.0"
      },
      {
        src: "http://static.videogular.com/assets/videos/elephants-dream.mp4#t=1.0"
      },
      {
        src: "http://localhost:4200/assets/[DATE(2016-08-14)TIME(13-00-00)]CH05.mp4"
      },

    ];
    return data;
  }

}
