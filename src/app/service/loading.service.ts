import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingPopupComponent } from '../common/pop-up/loading-popup/loading-popup.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  dialogRef: MatDialogRef<LoadingPopupComponent> | undefined;
  constructor(private dialog: MatDialog) {}

  start() {
    this.dialogRef = this.dialog.open(LoadingPopupComponent, {
      disableClose: true,
    });
  }

  finish() {
    if (this.dialogRef) {
      this.dialogRef?.close();
    }
  }
}
