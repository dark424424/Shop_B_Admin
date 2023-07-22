import { Component } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { take, tap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent {
  userId: string = '';

  user: any;

  activeTab: string = 'contact';

  orderlist: any[] = [];
  total: number = 0;
  itemsPerPage: number = 5;
  pageIndex: number = 1;

  selectedSort: string = 'newest';

  sortDropDownData = SortOptionList;

  constructor(
    private apiService: ApiService,
    private msgService: ErrorService,
    private route: Router
  ) {}

  ngOnInit() {
    this.getUserId();
    this.getInitUser().pipe(take(1)).subscribe();
  }

  private getUserId() {
    const path = this.route.url.split('/');
    this.userId = path[3];
    console.log(this.userId);
  }

  getInitUser() {
    const payload = {
      userId: this.userId,
    };
    return this.apiService.getUserDetail(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.user = response.user;
          this.orderlist = response.orderlist;
          this.total = response.ordercount;
        } else {
          this.msgService.start(response.message);
        }
      })
    );
  }

  getStatusStyles(isDisable: boolean) {
    if (isDisable) {
      return { 'background-color': '#ccc' };
    } else {
      return { 'background-color': 'teal' };
    }

    // // Mặc định trả về một đối tượng rỗng nếu không khớp với bất kỳ trạng thái nào
    // return {};
  }

  activateTab(tab: string) {
    this.activeTab = tab;
  }

  convertDate() {
    return moment(this.user.createdAt).format('DD/MM/YYYY');
  }

  convertDateInTable(date: any) {
    return moment(date).format('DD/MM/YYYY');
  }

  disableAccount() {
    const payload = {
      isDisable: true,
      userId: this.userId,
    };
    this.changeStatus(payload).pipe(take(1)).subscribe();
  }

  activeAccount() {
    const payload = {
      isDisable: false,
      userId: this.userId,
    };
    this.changeStatus(payload).pipe(take(1)).subscribe();
  }

  changeStatus(payload: any) {
    return this.apiService.updateUserStatus(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.msgService.startSuccess(response.message);
        } else {
          this.msgService.start(response.message);
        }
      })
    );
  }

  handlePageClick(event: any) {
    this.pageIndex = event;
    this.callApi().pipe(take(1)).subscribe();
  }

  filterChange() {
    this.callApi().pipe(take(1)).subscribe();
  }

  callApi() {
    const payload = {
      userId: this.userId,
      pageIndex: this.pageIndex,
      itemsPerPage: this.itemsPerPage,
      sortBy: this.selectedSort,
    };
    return this.apiService.searchOrderForUser(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.orderlist = response.orderlist;
        } else {
          this.msgService.start(response.message);
        }
      })
    );
  }

  getStatusTitle(status: string): string {
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

  getStatusStylesOrder(status: string) {
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
