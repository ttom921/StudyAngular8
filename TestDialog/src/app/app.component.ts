import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddPostDialogComponent } from './dialog/add-post-dialog/add-post-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'TestDialog';
  constructor(
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.dialog.afterAllClosed.subscribe(() => {
      console.log('目前已經沒有dialog了')
    });
    this.dialog.afterOpen.subscribe((dialogRef: MatDialogRef<any>) => {
      console.log(`新的dialog已開啟：${dialogRef.id}`);
      console.log(`目前已開啟：${this.dialog.openDialogs.length} 個dialog了`);
    });
  }
  shwoAddPostDialog() {
    this.dialog.open(AddPostDialogComponent);
  }

}
