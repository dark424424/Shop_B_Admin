import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  text: string = '';

  selectedSort: string = '';
  sortDropdownData = SortOptionList;

  // Paging
  total: number = 0;
  itemsPerPage: number = 10;
  pageIndex: number = 1;

  userList: any[] = [];

  constructor(
    private apiService: ApiService,
    private msgService: ErrorService
  ) {}

  ngOnInit() {
    this.callApi().pipe(take(1)).subscribe();
  }

  onSearchClick() {
    this.pageIndex = 1;

    this.callApi().pipe(take(1)).subscribe();
  }

  filterChange() {
    this.pageIndex = 1;

    this.callApi().pipe(take(1)).subscribe();
  }

  handlePageClick(event: any) {
    this.pageIndex = event;
    this.callApi().pipe(take(1)).subscribe();
  }

  callApi() {
    console.log(this.selectedSort);
    const payload = {
      pageIndex: this.pageIndex,
      itemsPerPage: this.itemsPerPage,
      sortBy: this.selectedSort ? this.selectedSort : 'newest',
      text: this.text,
    };

    return this.apiService.searchUser(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.total = response.count;
          this.userList = response.userList;
          console.log(this.userList);
        } else {
          this.msgService.start(response.message);
        }
      })
    );
  }
}

const SortOptionList = [
  { value: 'newest', name: 'Mới Nhất' },
  { value: 'oldest', name: 'Cũ Nhất' },
  { value: 'ordermax', name: 'Số lượng đơn' },
  { value: 'cancelMax', name: 'Đơn hủy do khách' },
];
