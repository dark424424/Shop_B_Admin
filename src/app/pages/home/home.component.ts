import { Component, OnInit } from '@angular/core';
import { Subscription, take, tap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { TotalPriceAndRevenue } from './home.model';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  subscription: Subscription[] = [];

  // Array for chart
  incomeList = INCOME_FAKE_LIST;
  categoryRevenue: any = [];
  categorySoldCount: any = [];
  lineChartTitle = 'Doanh Số 6 Tháng Gần Nhất';
  pie1ChartTitle = 'Số đơn trong 3 tháng gần nhất';
  pie2ChartTitle = 'Doanh thu trong 3 tháng gần nhất';

  // Data for feature
  thisMonthSale: number = 0;
  lastMonthSale: number = 0;
  prevMonthSale: number = 0;
  openOrdercount: number = 0;
  outOfStockCount: number = 0;
  inprogressCount: number = 0;

  totalSaleAndRevenue: TotalPriceAndRevenue;

  // Line graph payload
  month: number = 6;
  cat: string = '';

  constructor(
    private apiService: ApiService,
    private msgService: ErrorService
  ) {}

  ngOnInit() {
    this.callInitApi().pipe(take(1)).subscribe();
  }

  private callInitApi() {
    return this.apiService.getInitHomeInfo().pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          console.log(response);
          this.incomeList = response.incomeList;
          this.openOrdercount = response.openOrderCount;
          this.inprogressCount = response.inprogressOrderCount;
          this.outOfStockCount = response.outStockCount;
          // this.categorySoldCount = response.categoryQuantity;
          // Data For pie
          this.totalSaleAndRevenue = response.total[0];
          this.getArrayRevenue(response.categoryRate);
          this.getArraySoldPerCategory(response.categoryQuantity);
          // this.categoryRevenue = response.categoryRate;
          this.getFeatureInfo();
        } else {
          // this.loadingService.finish();
        }
      })
    );
  }

  getArrayRevenue(array: any) {
    let totalPriceOfAllCategory = 0;
    array.forEach((item: any) => {
      totalPriceOfAllCategory = totalPriceOfAllCategory + item.totalPrice;
    });
    array.push({
      _id: 'Các mặt hàng khác',
      totalPrice: this.totalSaleAndRevenue.totalPrice - totalPriceOfAllCategory,
    });

    this.categoryRevenue = array.map((item: any, index: number) => {
      const newItem = {
        name: item._id,
        y: item.totalPrice,
        color: ColorList[index],
      };
      return newItem;
    });
  }

  getArraySoldPerCategory(array: any) {
    let totalSoldOfAllCategory = 0;
    array.forEach((item: any) => {
      totalSoldOfAllCategory += item.totalSold;
    });

    array.push({
      _id: 'Các mặt hàng khác',
      totalSold: this.totalSaleAndRevenue.totalSale - totalSoldOfAllCategory,
    });

    this.categorySoldCount = array.map((item: any, index: number) => {
      const newItem = {
        name: item._id,
        y: item.totalSold,
        color: ColorList[index],
      };
      return newItem;
    });
  }

  getFeatureInfo(): void {
    const incomelength = this.incomeList.length;
    this.thisMonthSale = this.incomeList[incomelength - 1].total;
    this.lastMonthSale = this.incomeList[incomelength - 2].total;
    this.prevMonthSale = this.incomeList[incomelength - 3].total;
  }

  changeOrderCountMonthPie(event: any) {
    switch (event) {
      case 3: {
        this.pie1ChartTitle = 'Số đơn trong 3 tháng gần nhất';
        break;
      }
      case 6: {
        this.pie1ChartTitle = 'Số đơn trong 6 tháng gần nhất';
        break;
      }
      case 12: {
        this.pie1ChartTitle = 'Số đơn trong 12 tháng gần nhất';
        break;
      }
    }

    console.log(event);
    this.callApiOrderCount(event).pipe(take(1)).subscribe();
  }

  private callApiOrderCount(monthCount: number) {
    const payload = {
      time: monthCount,
    };
    return this.apiService.changeMonthOrderCount(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          console.log(response);
          this.totalSaleAndRevenue = response.total[0];
          this.getArraySoldPerCategory(response.categoryQuantityRateInfo);
        } else {
          this.msgService.start(response.message);
        }
      })
    );
  }

  changeRevenueCountMonthPie(event: any) {
    console.log(event);
    switch (event) {
      case 3: {
        this.pie2ChartTitle = 'Doanh thu trong 3 tháng gần nhất';
        break;
      }
      case 6: {
        this.pie2ChartTitle = 'Doanh thu trong 6 tháng gần nhất';
        break;
      }
      case 12: {
        this.pie2ChartTitle = 'Doanh thu trong 12 tháng gần nhất';
        break;
      }
    }
    this.callApiRevenueCount(event).pipe(take(1)).subscribe();
  }

  private callApiRevenueCount(monthCount: number) {
    const payload = {
      time: monthCount,
    };
    return this.apiService.changeMonthRevenueCount(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.totalSaleAndRevenue = response.total[0];
          this.getArrayRevenue(response.categoryRateInfo);
        } else {
          // this.loadingService.finish();
        }
      })
    );
  }

  changeLineMonth(event: any) {
    switch (event) {
      case 3: {
        this.lineChartTitle = 'Doanh số 3 tháng gần nhất';
        break;
      }
      case 6: {
        this.lineChartTitle = 'Doanh số 6 tháng gần nhất';
        break;
      }
      case 12: {
        this.lineChartTitle = 'Doanh số 12 tháng gần nhất';
        break;
      }
    }
    this.month = event;

    this.callApiChangeLineGraph().pipe(take(1)).subscribe();
  }

  changeLineCat(event: any) {
    this.cat = event;
    console.log(event);
    this.callApiChangeLineGraph().pipe(take(1)).subscribe();
  }

  private callApiChangeLineGraph() {
    const payload = {
      time: this.month,
      cat: this.cat,
    };
    return this.apiService.changeLineGraphInfo(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.incomeList = response.resultIcome;
        } else {
          // this.loadingService.finish();
        }
      })
    );
  }
}

const INCOME_FAKE_LIST = [
  {
    _id: {
      month: 6,
      year: 2023,
    },
    total: 1630000,
  },
  {
    _id: {
      month: 5,
      year: 2023,
    },
    total: 144000,
  },
  {
    _id: {
      month: 4,
      year: 2023,
    },
    total: 1424000,
  },
];

const ColorList = ['red', '#393e46', '#00adb5', '#ccc', '#506ef9'];
