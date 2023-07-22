import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-product-recommed-out-of-stock',
  templateUrl: './product-recommed-out-of-stock.component.html',
  styleUrls: ['./product-recommed-out-of-stock.component.css'],
})
export class ProductRecommedOutOfStockComponent implements OnInit {
  productList: any[] = [];
  count: number = 0;

  constructor(
    private apiService: ApiService,
    private msgService: ErrorService
  ) {}

  ngOnInit(): void {
    this.callApi().pipe(take(1)).subscribe();
  }

  private callApi() {
    return this.apiService.getOutOfStockList().pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.productList = response.filteredOutOfStockList.map(
            (product: any) => {
              const newProduct = {
                ...product,
                remainingDay: Math.round(product.remainingDay),
                timeDiff: Math.round(product.timeDiff),
              };
              return newProduct;
            }
          );
          this.count = response.filteredOutOfStockList.length;
          console.log(this.productList);
        } else {
          this.msgService.start(response.message);
        }
      })
    );
  }
}
