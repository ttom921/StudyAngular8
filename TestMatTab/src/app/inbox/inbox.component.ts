import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})

export class InboxComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  emailsDataSource = new MatTableDataSource<any>();
  totalCount: number;

  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
    this.getPages(0, 10);
    // 分頁切換時，動新取得資料
    this.paginator.page.subscribe((page: PageEvent) => {
      this.getPages(page.pageIndex, page.pageSize);
    });
  }
  getPages(pageIndex, pageSize) {
    // let totalcount_ = this.httpClient.get('https://jsonplaceholder.typicode.com/comments?_start=0', { observe: 'response' });
    // let pagedata_ = this.httpClient.get<any>(`https://jsonplaceholder.typicode.com/comments?_page=${pageIndex}&_limit=${pageSize}`);


    // forkJoin([totalcount_, pagedata_]).subscribe(results => {
    //   // results[0] is our totalcount_
    //   // results[1] is our character pagedata_
    //   //this.totalCount = results[0].length;
    //   // resp => {
    //   //   // display its headers
    //   //   const keys = resp.headers.keys();
    //   //   this.headers = keys.map(key =>
    //   //     `${key}: ${resp.headers.get(key)}`);

    //   console.log(results[0]);
    //   this.emailsDataSource.data = results[1];
    // });

    this.httpClient.get<any>(`https://jsonplaceholder.typicode.com/comments?_page=${pageIndex}&_limit=${pageSize}`, { observe: 'response' }).subscribe(data => {
      // const keys = data.headers.keys();
      // keys.map(key =>
      //   console.log(`${key}: ${data.headers.get(key)}`));
      this.totalCount = Number(data.headers.get('X-Total-Count'));//data.length;
      this.emailsDataSource.data = data.body;
    });
  }
  // ngOnInit() {
  //   this.httpClient.get<any>('https://jsonplaceholder.typicode.com/comments?_start=0').subscribe(data => {
  //     this.totalCount = data.length;
  //     this.emailsDataSource.data = data;
  //     this.emailsDataSource.paginator = this.paginator;
  //   });
  // }

}
