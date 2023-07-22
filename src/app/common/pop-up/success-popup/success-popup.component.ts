import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css'],
})
export class SuccessPopupComponent {
  message: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SuccessPopupComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = this.data;
  }

  closePopup() {
    this.dialogRef.close();
  }

  toCartPage() {
    setTimeout(() => {
      this.dialogRef.close();
      this.router.navigate(['/cart']);
    }, 500);
  }
}
