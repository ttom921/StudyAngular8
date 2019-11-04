# Asaweb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

因為資料夾有不一樣，所以建立的時修要設定一下
放到sever先來下`ng build --prod --base-href /ttom_html/ --deploy-url /ttom_html/`，資料會放在`dist/`的目錄下

## 加入AngularMateial
```
ng add @angular/material
```
目前選擇`deeppurple-amber`
加入theme設定
在’styles.scss’中,有四種選一種
```scss
@import "~@angular/material/prebuilt-themes/deeppurple-amber.css";
//@import "~@angular/material/prebuilt-themes/indigo-pink.css";
//@import "~@angular/material/prebuilt-themes/pink-bluegrey.css";
//@import "~@angular/material/prebuilt-themes/purple-green.css";
```
加入SharedAngularMaterial <https://ithelp.ithome.com.tw/articles/10209937
```
ng g m share\SharedAngularMaterial
```
在MatIcon中使用SVG

必須透過Angular提供的DomSanitizer Service來信任這個路徑。接著我們就可以透過MatIconRegistry來擴充SVG icon
```typescript
export class SharedAngularMaterialModule implements OnInit {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.ngOnInit();
  }
  ngOnInit(): void {
    // this.matIconRegistry.addSvgIconInNamespace(
    //   "custom-svg",
    //   "angular",
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/angular_solidBlack.svg")
    // );
  }
```
## 在MatIcon中使用Icon Font
```bash
npm install --save @fortawesome/fontawesome-free
```
接下來在src\styles.scss中
```scss
@import "~@angular/material/prebuilt-themes/deeppurple-amber.css";
//@import "~@angular/material/prebuilt-themes/indigo-pink.css";
//@import "~@angular/material/prebuilt-themes/pink-bluegrey.css";
//@import "~@angular/material/prebuilt-themes/purple-green.css";
@import "~@fortawesome/fontawesome-free/css/all.css";
```

## 加人dashboard的模組
```
ng g m dashboard --routing
```

### 加人dashboard的元件
```
ng g c dashboard 
```

##  加入login
```
ng g c login
```
## 加入404頁
```
ng g c error-pages/not-found
```
admin@asa.com
admin