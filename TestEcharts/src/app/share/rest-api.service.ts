import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  // Define API
  apiURL = 'http://localhost:3000';
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getBar(): Observable<any> {
    return this.http.get<any>(this.apiURL + "/bardata").pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  getLineChart(): Observable<any> {
    return this.http.get<any>(this.apiURL + "/linechardata").pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  //郵件營銷
  getLineStackMail(): Observable<any> {
    return this.http.get<any>(this.apiURL + "/linecharmaildata").pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  //聯盟廣告
  getLineStackAllia(): Observable<any> {
    return this.http.get<any>(this.apiURL + "/linecharalliedata").pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  //視頻廣告
  getLineStackVideo(): Observable<any> {
    return this.http.get<any>(this.apiURL + "/linecharvideodata").pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  //柱狀圖動畫延遲
  getBarAniDelay(): Observable<any> {
    return this.http.get<any>(this.apiURL + "/baranidelaydata").pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  //折柱混合
  getBarMixLine(): Observable<any> {
    return this.http.get<any>(this.apiURL + "/mixlinebardata").pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
