import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddPostConfirmDialogComponent } from '../add-post-confirm-dialog/add-post-confirm-dialog.component';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.scss']
})
export class AddPostDialogComponent implements OnInit {
  title: string;
  constructor(private dialogRef: MatDialogRef<AddPostDialogComponent>, private dialog: MatDialog) { }

  ngOnInit() {
    //this.move();
  }
  doPost() {
    this.dialog.open(AddPostConfirmDialogComponent, {
      data: {
        title: this.title
      }
    });
  }
  move() {
    this.dialogRef.updatePosition({
      top: '0',
      left: '0'
    });
  }
}
