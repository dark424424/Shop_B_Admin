import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, take } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

import { AuthService } from 'src/app/service/auth.service';
// import { LoadingService } from 'src/app/service/popup.service.ts/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  subcription: Subscription[];
  loginForm: FormGroup;
  userInputMessage: any;
  passwordInputMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService
  ) // private loadingService: LoadingService
  {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  checkValidate(fieldName: string) {
    const field = this.loginForm.get(fieldName);

    if (fieldName === 'username') {
      this.userInputMessage = null;
      if (field?.invalid) {
        if (field?.hasError('required')) {
          this.userInputMessage = 'Vui Lòng Nhập Tài Khoản';
          return;
        } else if (field?.hasError('minlength')) {
          this.userInputMessage = 'Tài Khoản cần lớn hơn 6 ký tự';
        }
      }
    }

    if (fieldName === 'password') {
      this.passwordInputMessage = null;
      if (field?.invalid) {
        if (field?.hasError('required')) {
          this.passwordInputMessage = 'Vui Lòng Nhập Mật Khẩu';
          return;
        } else if (field?.hasError('minlength')) {
          this.passwordInputMessage = 'Mật khẩu cần lớn hơn 6 ký tự';
        }
      }
    }
  }

  onSubmit() {
    this.passwordInputMessage = null;
    this.userInputMessage = null;
    if (this.loginForm.valid) {
      const payload = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      // this.loadingService.start();
      this.authService.loginUser(payload).pipe(take(1)).subscribe();
    } else {
      this.checkValidate('username');
      this.checkValidate('password');
    }
  }
}
