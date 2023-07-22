import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent implements OnInit {
  value: string = '';
  catDropDownData = CatDropdownData;
  brandDropDownData = BrandDropDownList;
  sortDropDownData = SortOptionList;
  stockDropDown = StockList;

  // Search info
  selectedCategory: string = '';
  selectedBrand: string = '';
  selectedSort: string = '';
  selectedStock: string = '';

  // Paging
  total: number = 0;
  itemsPerPage: number = 10;
  pageIndex: number = 1;

  // Product
  productList: any[] = [];

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
    const payload = {
      pageIndex: this.pageIndex,
      itemsPerPage: this.itemsPerPage,
      condition: {
        cat: this.selectedCategory ? [this.selectedCategory] : [],
        reqBrand: this.selectedBrand,
        stock: this.selectedStock,
      },
      sortBy: this.selectedSort ? this.selectedSort : 'newest',
      text: this.value,
    };

    return this.apiService.searchProduct(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.total = response.total;
          this.productList = response.products;
        } else {
          this.msgService.start(response.message);
        }
      })
    );
  }
}

const CatDropdownData = [
  { value: 'Laptop', name: 'Máy Tính Xách Tay' },
  { value: 'Airpod', name: 'Airpod' },
  { value: 'Speaker', name: 'Loa' },
  { value: 'Smartwatch', name: 'Đồng Hồ Thông Minh' },
  { value: 'Camera', name: 'Camera' },
  { value: 'Accessory', name: 'Phụ Kiện' },
];

const BrandDropDownList = [
  { value: 'Sony', name: 'Sony' },
  { value: 'Azur', name: 'Azur' },
  { value: 'Dell', name: 'Dell' },
  { value: 'Apple', name: 'Apple' },
  { value: 'Camera', name: 'Camera' },
  { value: 'Acer', name: 'Acer' },
  { value: 'Xiaomi', name: 'Xiaomi' },
  { value: 'Fitbit', name: 'Fitbit' },
  { value: 'Questek', name: 'Questek' },
];

const SortOptionList = [
  { value: 'newest', name: 'Mới Nhập Hàng' },
  { value: 'oldest', name: 'Cũ Nhất' },
  { value: 'point', name: 'Điểm Đánh Giá' },
  { value: 'soldNumber', name: 'Số Lượng Bán' },
  { value: 'reviewCount', name: 'Số Lượt Đánh Giá' },
];

const StockList = [
  { value: 'in', name: 'Còn Hàng' },
  { value: 'out', name: 'Hết Hàng' },
];
