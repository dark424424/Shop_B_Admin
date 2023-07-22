import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-info',
  templateUrl: './feature-info.component.html',
  styleUrls: ['./feature-info.component.css'],
})
export class FeatureInfoComponent implements OnInit {
  @Input() thisMonthSales: number = 300000;

  @Input() lastMonthSales: number = 24000000;

  @Input() prevMonthSales: number = 2500000;

  @Input() openOrderCount: number;

  @Input() inprogressCount: number;

  @Input() outOfStockCount: number;

  percent: number;

  ngOnInit() {}

  ngOnChanges() {
    this.percent = Math.ceil(
      (this.lastMonthSales * 100) / this.prevMonthSales - 100
    );
  }
}
