import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortTable: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  currentFilterData: string;

  emailsDataSource = new MatTableDataSource<any>();
  totalCount: number;
  currentPage: PageEvent;
  currentSort: Sort;
  constructor(
    private httpClient: HttpClient,
    private matPaginatorIntl: MatPaginatorIntl
  ) { }

  ngOnInit() {


    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    }
    this.currentSort = {
      active: '',
      direction: ''
    }
    this.getPages();
    // 分頁切換時，重新取得資料
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getPages();
    });
    fromEvent(this.filter.nativeElement, 'keyup').pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      //準備要提供給API的filter資料
      this.currentFilterData = (this.filter.nativeElement as HTMLInputElement).value;
      this.getPages();
      // 後端篩選就不需要指定filter了
      //this.emailsDataSource.filter = (this.filter.nativeElement as HTMLInputElement).value;
      // this.emailsDataSource.filterPredicate = (data: any, filter: string): boolean => {
      //   return data.name.indexOf(filter) !== -1;//真對name欄位
      // };
    });
    // 設定顯示筆數資訊文字
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `第 0 筆、共  ${length} 筆`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const ednIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `第 ${startIndex + 1} - ${ednIndex} 筆、共  ${length} 筆`
    };
    // 設定其他顯示資訊文字
    this.matPaginatorIntl.itemsPerPageLabel = '每頁筆數：';
    this.matPaginatorIntl.nextPageLabel = '下一頁';
    this.matPaginatorIntl.previousPageLabel = '上一頁';
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
    if (this.currentFilterData) {
      targetUrl = `${targetUrl}&q=${this.currentFilterData}`;
    }
    console.log(targetUrl);
    this.httpClient.get<any>(targetUrl, { observe: 'response' }).subscribe(data => {
      this.totalCount = Number(data.headers.get('X-Total-Count'));//data.length;
      this.emailsDataSource.data = data.body;
      //設定使用前端資料排序
      //this.emailsDataSource.sort = this.sortTable;
      // 從後端取得資料時，就不用指定data srouce的paginator了
      //this.emailsDataSource.paginator = this.paginator;
    });
  }
  replay(row) { }
  delete(row) { }
}
