import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  title = 'angular-charts-youtube';

  @Input() incomeList: any[];

  @Input() categoryRevenue: any[];
  @Input() categorySoldCount: any[];

  @Input() lineChartTitle: string;
  @Input() pie1Title: string;
  @Input() pie2Title: string;

  @Output() ChangePie1Month: EventEmitter<string | number> = new EventEmitter();
  @Output() ChangePie2Month: EventEmitter<string | number> = new EventEmitter();
  @Output() ChangeLineMonth: EventEmitter<string | number> = new EventEmitter();
  @Output() ChangeLineCategory: EventEmitter<string> = new EventEmitter();

  lineChart: Chart;

  pieChartCategoryRevenue: Chart;
  pieChartCategorySoldCount: Chart;

  //
  selectedMonthCategoryRevenue: string | number = '';
  selectedMonthCategorySoldCount: string | number = '';

  selectedMonthLineChart: string | number = '';
  selectedCat: string = '';

  //
  monthDropdown = monthDropdown;
  catDropdown = CatDropDownList;

  onChangeMonthSoldCount() {
    this.ChangePie1Month.emit(this.selectedMonthCategorySoldCount);
  }
  onChangeMonthRevenue() {
    this.ChangePie2Month.emit(this.selectedMonthCategoryRevenue);
  }

  onChangeMonthLine() {
    this.ChangeLineMonth.emit(this.selectedMonthLineChart);
  }
  onChangeCat() {
    this.ChangeLineCategory.emit(this.selectedCat);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['incomeList'] && this['incomeList']) {
      const labels = this['incomeList'].map(
        (item) => `${item['_id'].month}/${item['_id'].year}`
      );
      const data = this['incomeList'].map((item) => item['total']);

      this.lineChart = new Chart({
        chart: {
          type: 'line',
        },
        title: {
          text: this.lineChartTitle,
        },
        xAxis: {
          categories: labels,
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: 'Doanh số',
            data: data,
          } as any,
        ],
      });
    }
    if (changes['categorySoldCount'] && this['categorySoldCount']) {
      this.pieChartCategorySoldCount = new Chart({
        chart: {
          type: 'pie',
          plotShadow: false,
        },

        credits: {
          enabled: false,
        },

        plotOptions: {
          pie: {
            innerSize: '99%',
            borderWidth: 10,
            borderColor: '',
            slicedOffset: 10,
            dataLabels: {
              connectorWidth: 0,
            },
          },
        },
        title: {
          verticalAlign: 'bottom',
          margin: 40,
          text: this.pie1Title,
          align: 'center',
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            name: 'Số Đơn',
            type: 'pie',
            data: this.categorySoldCount,
          },
        ],
      });
    }

    if (changes['categoryRevenue'] && this['categoryRevenue']) {
      console.log(this.categoryRevenue);
      this.pieChartCategoryRevenue = new Chart({
        chart: {
          type: 'pie',
          plotShadow: false,
        },

        credits: {
          enabled: false,
        },

        plotOptions: {
          pie: {
            innerSize: '99%',
            borderWidth: 10,
            borderColor: '',
            slicedOffset: 10,
            dataLabels: {
              connectorWidth: 0,
            },
          },
        },

        title: {
          verticalAlign: 'bottom',
          // floating: true,
          margin: 40,
          text: this.pie2Title,
        },

        legend: {
          enabled: false,
        },

        series: [
          {
            name: 'Doanh Số',
            type: 'pie',
            data: this.categoryRevenue,
          },
        ],
      });
    }
  }
}

const monthDropdown = [
  {
    value: 3,
    name: '3 tháng',
  },
  {
    value: 6,
    name: '6 tháng',
  },
  {
    value: 12,
    name: '1 Năm',
  },
];

const CatDropDownList = [
  { value: 'Laptop', name: 'Máy Tính Xách Tay' },
  { value: 'Airpod', name: 'Airpod' },
  { value: 'Speaker', name: 'Loa' },
  { value: 'Smartwatch', name: 'Đồng Hồ Thông Minh' },
  { value: 'Camera', name: 'Camera' },
  { value: 'Accessory', name: 'Phụ Kiện' },
];
