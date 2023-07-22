import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import moment from 'moment';
import { take, tap } from 'rxjs';
import { ReasonCancelComponent } from 'src/app/common/pop-up/reason-cancel/reason-cancel.component';
import { ApiService } from 'src/app/service/api.service';
import { ErrorService } from 'src/app/service/error.service';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent {
  order: any = BaseOrder;
  dateTitle: string;
  orderTitle: string;
  userId: string = '';
  orderId: string = '';

  FileImg: any;
  productImg: any;

  dialogRef: MatDialogRef<ReasonCancelComponent> | undefined;

  constructor(
    private errorService: ErrorService,
    private route: Router,
    private apiservice: ApiService,
    private fireStorage: AngularFireStorage,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getOrderId();
    this.callApi();
  }

  private convertTitle() {
    this.dateTitle = this.dateTransform(this.order.createdAt);

    const titleArray = this.order.products.map(
      (product: any) => product.productId.title
    );
    const title = titleArray.join(', ');
    this.orderTitle = title;
  }

  private callApi() {
    const payload = {
      id: this.orderId,
    };
    this.getOrderDetailApi(payload).pipe(take(1)).subscribe();
  }

  getOrderId() {
    const path = this.route.url.split('/');
    this.orderId = path[3];
  }

  private getOrderDetailApi(payload: any) {
    return this.apiservice.getOrderDetail(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.order = response.orderDetail;
          this.convertTitle();
        } else {
          this.errorService.start(response.message);
        }
      })
    );
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

  dateTransform(date: string | any) {
    const newDate = moment(date).format(' H [giờ ngày] D [tháng] M [năm] YYYY');
    console.log(newDate);
    return newDate;
  }

  async onFileChange(event: any) {
    this.FileImg = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.productImg = e.target.result; // Gán kết quả đọc hình ảnh vào biến productImage
    };

    reader.readAsDataURL(this.FileImg);
  }

  verifyOrder() {
    this.verifyApi().pipe(take(1)).subscribe();
  }

  verifyApi() {
    const payload = {
      id: this.orderId,
    };
    return this.apiservice.verifyOrder(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.errorService.startSuccess('Duyệt Đơn Hàng Thành Công');
        } else {
          this.errorService.start(response.message);
        }
      })
    );
  }

  async doneOrder() {
    if (this.FileImg) {
      this.loadingService.start();
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}_${this.FileImg.name}`;
      const path = `evidence/${fileName}`;
      const uploadTask = await this.fireStorage.upload(path, this.FileImg);
      const url = await uploadTask.ref.getDownloadURL();
      const payload = {
        id: this.orderId,
        img: url,
        userId: this.order.userId,
      };
      this.doneApi(payload).pipe(take(1)).subscribe();
    } else {
    }
  }

  doneApi(payload: any) {
    return this.apiservice.doneOrder(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.errorService.startSuccess('Hoàn Thành Đơn Thành Công');
          this.loadingService.finish();
        } else {
          this.errorService.start(response.message);
          this.loadingService.finish();
        }
      })
    );
  }

  cancelOrder() {
    this.dialogRef = this.dialog.open(ReasonCancelComponent, {
      disableClose: true,
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result.code === 1 && result.type !== '') {
        this.loadingService.start();
        const payload = {
          id: this.orderId,
          reason: result.reason,
          type: result.type,
        };
        this.cancelApi(payload).pipe(take(1)).subscribe();
      } else {
      }
    });
  }

  cancelApi(payload: any) {
    return this.apiservice.cancelOrder(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.errorService.startSuccess('Hủy Đơn Thành Công');
          this.loadingService.finish();
        } else {
          this.errorService.start(response.message);
          this.loadingService.finish();
        }
      })
    );
  }
}

const BaseOrder = {
  _id: '',
  products: [],
};
