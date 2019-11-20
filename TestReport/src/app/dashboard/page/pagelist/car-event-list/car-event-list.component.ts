import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CarEventsService } from 'src/app/_services/car-events.service';

@Component({
  selector: 'app-car-event-list',
  templateUrl: './car-event-list.component.html',
  styleUrls: ['./car-event-list.component.scss']
})
export class CarEventListComponent implements OnInit {

  carEventssDataSource = new MatTableDataSource<any>();
  constructor(
    private carEventsService: CarEventsService,
  ) { }

  ngOnInit() {
    this.carEventsService.Gets().subscribe(data => {
      this.carEventssDataSource.data = data;
    });
  }

}
