import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.css'],
})
export class ErrorPopupComponent {
  message: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ErrorPopupComponent>
  ) {}

  ngOnInit(): void {
    this.message = this.data;
  }

  closePopup() {
    this.dialogRef.close();
  }
}
