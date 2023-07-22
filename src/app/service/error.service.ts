import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ErrorPopupComponent } from 'src/app/common/pop-up/error-popup/error-popup.component';
import { SuccessPopupComponent } from 'src/app/common/pop-up/success-popup/success-popup.component';
import { LoadingPopupComponent } from '../common/pop-up/loading-popup/loading-popup.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  dialogRef: MatDialogRef<LoadingPopupComponent> | undefined;
  constructor(private dialog: MatDialog, private Route: Router) {}

  start(payload: string) {
    this.dialogRef = this.dialog.open(ErrorPopupComponent, {
      data: payload,
    });
  }

  startSuccess(payload: string) {
    this.dialogRef = this.dialog.open(SuccessPopupComponent, {
      data: payload,
    });

    // this.dialogRef.afterClosed().subscribe((result) => {
    //   // Xử lý giá trị trả về từ dialog
    //   if (result === 0) {
    //     window.location.reload();
    //   }
    // });
  }
}
