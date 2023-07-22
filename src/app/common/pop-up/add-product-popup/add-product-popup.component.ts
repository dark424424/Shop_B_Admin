import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product-popup',
  templateUrl: './add-product-popup.component.html',
  styleUrls: ['./add-product-popup.component.css'],
})
export class AddProductPopupComponent {
  quantity: number;
  error: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddProductPopupComponent>,
    private router: Router
  ) {}

  closePopup() {
    this.dialogRef.close({ code: 0 });
  }

  sentDataback() {
    if (this.quantity) {
      this.dialogRef.close({ code: 1, quantity: this.quantity });
    } else {
      this.error = 'Vui Lòng Nhập Lượng Hàng Muốn Nhập';
    }
  }
}
