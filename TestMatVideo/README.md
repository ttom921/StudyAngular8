# TestMatVideo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## 加入AngularMateial

```
ng add @angular/material
```

目前選擇`indigo-pink `
加入theme設定
在’styles.scss’中,有四種選一種

```scss
//@import "~@angular/material/prebuilt-themes/deeppurple-amber.css";
//@import "~@angular/material/prebuilt-themes/indigo-pink.css";
//@import "~@angular/material/prebuilt-themes/pink-bluegrey.css";
//@import "~@angular/material/prebuilt-themes/purple-green.css";
```

加入SharedAngularMaterial <https://ithelp.ithome.com.tw/articles/10209937

```
ng g m share\SharedAngularMaterial
```

## 在MatIcon中使用Icon Font

```bash
npm install --save @fortawesome/fontawesome-free
```

接下來在src\styles.scss中

```scss
//@import "~@angular/material/prebuilt-themes/deeppurple-amber.css";
//@import "~@angular/material/prebuilt-themes/indigo-pink.css";
//@import "~@angular/material/prebuilt-themes/pink-bluegrey.css";
//@import "~@angular/material/prebuilt-themes/purple-green.css";
@import "~@fortawesome/fontawesome-free/css/all.css";
```

##  建立影像播放

```
npm install --save mat-video
ng g component VideoPlayManager
```

加入Mat-Video到SharedAngularMaterial

```typescript
//...
import { MatVideoModule } from 'mat-video';
@NgModule({
  declarations: [],
  imports: [
   //...
    MatVideoModule,
  ],
  exports: [
   //...
    MatVideoModule,
  ]
})
```

```
src: 'http://static.videogular.com/assets/videos/videogular.mp4',
src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
```

## 如何使用

在html

```
<p>video-play-manager works!</p>
<mat-video #video src="http://static.videogular.com/assets/videos/videogular.mp4"></mat-video>
```

在

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatVideoComponent } from 'mat-video/app/video/video.component';

@Component({
  selector: 'app-video-play-manager',
  templateUrl: './video-play-manager.component.html',
  styleUrls: ['./video-play-manager.component.scss']
})
export class VideoPlayManagerComponent implements OnInit {

  @ViewChild('video', { static: true }) matVideo: MatVideoComponent;
  video: HTMLVideoElement;
  constructor() {

  }

  ngOnInit() {
    this.video = this.matVideo.getVideoTag();
    this.video.addEventListener('timeupdate', (ev) => {
      console.log('video timeupdate->' + this.video.currentTime);

    });
  }

}

```

## 重新建立MatVideo

因為它有一些功能，不是我想要的所以來重新打包一下,可以參考一下[mat-video](https://github.com/nkoehler/mat-video)

在下面建立資料夾src\app\_common\video

將原來的github的碼全部拷貝過來,再加入`src\app\app.module.ts`的模組之中





## 參考資料

[mat-video](https://github.com/nkoehler/mat-video)

[影像列表](https://www.toptal.com/angular-js/angular-video-player-videogular)