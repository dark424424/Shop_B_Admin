import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { take, tap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-history-order-page',
  templateUrl: './history-order-page.component.html',
  styleUrls: ['./history-order-page.component.css'],
})
export class HistoryOrderPageComponent implements OnInit {
  total: number;
  pageIndex: number = 1;
  itemsPerPage: number = 10;

  orderList: any[] = [];

  orderListWithNewStatus: any[] = [];
  selectedStatus: string = '3';

  statusDropDown = STATUS_DROPDOWN;

  sortDropDownData = SortOptionList;
  selectedSort: string = '';

  constructor(
    private apiService: ApiService,
    private msgService: ErrorService
  ) {}

  ngOnInit(): void {
    this.callApi().pipe(take(1)).subscribe();
  }

  filterChange() {
    this.callApi().pipe(take(1)).subscribe();
  }

  onChangeDropDown() {
    this.pageIndex = 1;
    this.callApi().pipe(take(1)).subscribe();
  }

  handlePageClick(event: any) {
    this.pageIndex = event;
    this.callApi().pipe(take(1)).subscribe();
  }

  private callApi() {
    const payload = {
      status: this.getStatusArray(),
      pageIndex: this.pageIndex,
      itemsPerPage: this.itemsPerPage,
      sort: this.selectedSort,
    };
    return this.apiService.getOrderListWithPaging(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.orderList = response.orderList;
          this.getTitleOfProduct();
          this.total = response.total;
        } else {
          this.msgService.start(response.message);
        }
      })
    );
  }

  private getStatusArray() {
    switch (this.selectedStatus) {
      case '1':
        return ['Done'];

      case '2':
        return ['Cancelled'];
      case '3':
        return ['Done', 'Cancelled'];
      default:
        return ['Done', 'Cancelled'];
    }
  }

  private getTitleOfProduct() {
    this.orderListWithNewStatus = this.orderList.map((item) => {
      const newItem = {
        ...item,
        statusTitle: this.setStatus(item.status),
        createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
      };
      return newItem;
    });

    console.log(this.orderListWithNewStatus);
  }

  setStatus(status: string): string {
    switch (status) {
      case 'Cancelled':
        return 'Bị Hủy';
      case 'Done':
        return 'Hoàn Thành';
      case 'Open':
        return 'Chờ Duyệt';
      case 'Inprogress':
        return 'Đang Giao Hàng';
      default:
        return '';
    }
  }

  getStatusStyles(status: string) {
    if (status === 'Inprogress') {
      return { 'background-color': 'blue' };
    } else if (status === 'Open') {
      return { 'background-color': '#ccc' };
    } else if (status === 'Done') {
      return { 'background-color': 'teal' };
    } else if (status === 'Cancelled') {
      return { 'background-color': 'gray' };
    }

    // Mặc định trả về một đối tượng rỗng nếu không khớp với bất kỳ trạng thái nào
    return {};
  }
}

const STATUS_DROPDOWN = [
  {
    value: '1',
    name: 'Đã Hoàn Thành',
  },
  {
    value: '2',
    name: 'Bị Hủy',
  },
  {
    value: '3',
    name: 'Tất Cả Lịch Sử',
  },
];

const SortOptionList = [
  { value: 'newest', name: 'Mới Nhất' },
  { value: 'oldest', name: 'Cũ Nhất' },
];
