import { Component, OnInit } from '@angular/core';
import { View } from '@syncfusion/ej2-schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  public setView: View = 'Month';
  
  constructor() { }

  ngOnInit() {
  }

}
