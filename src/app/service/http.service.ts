import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  post(url: string, param?: any) {
    const newUrl = environment.apiUrl + url;
    console.log(newUrl);
    return this.http.post(newUrl, param);
  }

  get(url: string, param?: any) {
    const newUrl = environment.apiUrl + url;
    return this.http.post(newUrl, param);
  }
}
