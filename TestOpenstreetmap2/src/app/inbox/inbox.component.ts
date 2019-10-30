import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})

export class InboxComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortTable: MatSort;

  emailsDataSource = new MatTableDataSource<any>();
  totalCount: number;
  currentPage: PageEvent;
  currentSort: Sort;

  constructor(private httpClient: HttpClient) { }
  ngOnInit() {

    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.currentSort = {
      active: '',
      direction: ''
    };

    this.getPages();
    // 分頁切換時，動新取得資料
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getPages();
    });
  }
  changeSort(sortInfo: Sort) {
    // 因為API排序欄位是created，因此在這邊做調整
    if (sortInfo.active === 'id') {
      sortInfo.active = 'id';
    }
    this.currentSort = sortInfo;
    this.getPages();
  }

  getPages() {
    const baseUrl = 'https://jsonplaceholder.typicode.com/comments';
    let targetUrl = `${baseUrl}?_page=${this.currentPage.pageIndex + 1}&_limit=${this.currentPage.pageSize}`;
    if (this.currentSort.direction) {
      targetUrl = `${targetUrl}&_sort=${this.currentSort.active}&_order=${this.currentSort.direction}`;
    }
    console.log(targetUrl);
    this.httpClient.get<any>(targetUrl, { observe: 'response' }).subscribe(data => {
      this.totalCount = Number(data.headers.get('X-Total-Count'));//data.length;
      this.emailsDataSource.data = data.body;
    });
    // this.httpClient.get<any>(`https://jsonplaceholder.typicode.com/comments?_page=${pageIndex}&_limit=${pageSize}`, { observe: 'response' }).subscribe(data => {
    //   this.totalCount = Number(data.headers.get('X-Total-Count'));//data.length;
    //   this.emailsDataSource.data = data.body;
    //   //設定使用前端資料排序
    //   this.emailsDataSource.sort = this.sortTable;
    // });
  }

}


// import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { HttpClient } from '@angular/common/http';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { forkJoin } from 'rxjs';
// import { MatSort } from '@angular/material/sort';

// @Component({
//   selector: 'app-inbox',
//   templateUrl: './inbox.component.html',
//   styleUrls: ['./inbox.component.scss']
// })

// export class InboxComponent implements OnInit {

//   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
//   @ViewChild(MatSort, { static: true }) sortTable: MatSort;

//   emailsDataSource = new MatTableDataSource<any>();
//   totalCount: number;

//   constructor(private httpClient: HttpClient) { }
//   ngOnInit() {
//     this.getPages(0, 10);
//     // 分頁切換時，動新取得資料
//     this.paginator.page.subscribe((page: PageEvent) => {
//       this.getPages(page.pageIndex, page.pageSize);
//     });
//   }
//   getPages(pageIndex, pageSize) {
//     // let totalcount_ = this.httpClient.get('https://jsonplaceholder.typicode.com/comments?_start=0', { observe: 'response' });
//     // let pagedata_ = this.httpClient.get<any>(`https://jsonplaceholder.typicode.com/comments?_page=${pageIndex}&_limit=${pageSize}`);


//     // forkJoin([totalcount_, pagedata_]).subscribe(results => {
//     //   // results[0] is our totalcount_
//     //   // results[1] is our character pagedata_
//     //   //this.totalCount = results[0].length;
//     //   // resp => {
//     //   //   // display its headers
//     //   //   const keys = resp.headers.keys();
//     //   //   this.headers = keys.map(key =>
//     //   //     `${key}: ${resp.headers.get(key)}`);

//     //   console.log(results[0]);
//     //   this.emailsDataSource.data = results[1];
//     // });

//     this.httpClient.get<any>(`https://jsonplaceholder.typicode.com/comments?_page=${pageIndex}&_limit=${pageSize}`, { observe: 'response' }).subscribe(data => {
//       // const keys = data.headers.keys();
//       // keys.map(key =>
//       //   console.log(`${key}: ${data.headers.get(key)}`));
//       this.totalCount = Number(data.headers.get('X-Total-Count'));//data.length;
//       this.emailsDataSource.data = data.body;
//       //設定使用前端資料排序
//       this.emailsDataSource.sort = this.sortTable;
//     });
//   }
//   // ngOnInit() {
//   //   this.httpClient.get<any>('https://jsonplaceholder.typicode.com/comments?_start=0').subscribe(data => {
//   //     this.totalCount = data.length;
//   //     this.emailsDataSource.data = data;
//   //     this.emailsDataSource.paginator = this.paginator;
//   //   });
//   // }

// }
