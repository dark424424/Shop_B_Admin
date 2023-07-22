import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reason-cancel',
  templateUrl: './reason-cancel.component.html',
  styleUrls: ['./reason-cancel.component.css'],
})
export class ReasonCancelComponent {
  error: string | null = null;
  reasonDropDownData = REASON_DROPDOWN_Shop;
  reasonUserDropDownData = REASON_DROPDOWN_User;

  typelist = TYPE_LIST;

  selectedReason: string = '';
  reason: string = '';
  type: number | string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReasonCancelComponent>,
    private router: Router
  ) {}

  closePopup() {
    this.dialogRef.close({ code: 0 });
  }

  onChangeInfoDropDown() {
    this.reason = this.selectedReason;
  }

  sentDataback() {
    this.error = '';
    if (this.reason) {
      this.dialogRef.close({ code: 1, reason: this.reason, type: this.type });
    } else {
      this.error = 'Vui Lòng Điền Lý Do';
    }
  }
}

const REASON_DROPDOWN_Shop = [
  'Sản Phẩm Hết Hàng',
  'Không thể giao hàng',
  'Thay đổi giá hoặc thông tin sản phẩm',
];

const REASON_DROPDOWN_User = [
  'Không thể liên hệ khách hàng',
  'Địa chỉ giao hàng không hợp lệ',
];

const TYPE_LIST = [
  {
    value: 0,
    name: 'Cửa Hàng',
  },
  {
    value: 1,
    name: 'Khách Hàng',
  },
];
