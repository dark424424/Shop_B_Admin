import { Component } from '@angular/core';
import moment from 'moment';
import { take, tap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-inprogress-order-page',
  templateUrl: './inprogress-order-page.component.html',
  styleUrls: ['./inprogress-order-page.component.css'],
})
export class InprogressOrderPageComponent {
  orderList: any[] = [];
  orderListWithNewTitle: any[] = [];
  count: number = 0;

  sortDropDownData = SortOptionList;
  selectedSort: string = '';

  constructor(
    private apiService: ApiService,
    private msgService: ErrorService
  ) {}

  ngOnInit() {
    this.callApi().pipe(take(1)).subscribe();
  }

  filterChange() {
    this.callApi().pipe(take(1)).subscribe();
  }

  private callApi() {
    const payload = {
      status: 'Inprogress',
      sort: this.selectedSort,
    };
    return this.apiService.getOrderList(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.orderList = response.orderList;
          this.getTitleOfProduct();
        } else {
          this.msgService.start(response.message);
        }
      })
    );
  }

  private getTitleOfProduct() {
    this.orderListWithNewTitle = this.orderList.map((item) => {
      const titleArray = item.products.map(
        (product: any) => product.productId.title
      );
      const title = titleArray.join(', ');
      const newItem = {
        ...item,
        titleOrder: title,
        statusTitle: this.setStatus(item.status),
        createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
      };
      return newItem;
    });

    this.count = this.orderListWithNewTitle.length;
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

const SortOptionList = [
  { value: 'newest', name: 'Mới Nhất' },
  { value: 'oldest', name: 'Cũ Nhất' },
];
