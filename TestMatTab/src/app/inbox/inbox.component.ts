import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';

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
    this.httpClient.get<any>('https://jsonplaceholder.typicode.com/comments?_start=0').subscribe(data => {
      this.totalCount = data.length;
      this.emailsDataSource.data = data;
      this.emailsDataSource.paginator = this.paginator;
    });
  }
}
