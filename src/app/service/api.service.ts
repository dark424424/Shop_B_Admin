import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { GetCatRequest } from './model.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private httpService: HttpService) {}

  login(payload: any) {
    return this.httpService.post(`/api/auth/loginadmin`, payload);
  }

  // Home Page
  getInitHomeInfo() {
    return this.httpService.post(`/api/orders/inithomeinfo`);
  }

  changeMonthOrderCount(payload: any) {
    return this.httpService.post(`/api/orders/ordercount`, payload);
  }

  changeMonthRevenueCount(payload: any) {
    return this.httpService.post(`/api/orders/revenuebymonth`, payload);
  }

  changeLineGraphInfo(payload: any) {
    return this.httpService.post(`/api/orders/incomebycat`, payload);
  }

  // end Home

  // Lấy thông số kỹ thuật cần điền :
  getCategoryInfo(payload: GetCatRequest) {
    return this.httpService.post(`/api/category/findcat`, payload);
  }

  // addproduct()
  addNewProduct(payload: any) {
    return this.httpService.post('/api/products/create', payload);
  }

  // Search Product
  searchProduct(payload: any) {
    return this.httpService.post('/api/products/search', payload);
  }

  // Get Product Detail
  getProductDetail(payload: any) {
    return this.httpService.post('/api/products/getproductadmin', payload);
  }

  //Update Product Detail
  updateProductDetail(payload: any, id: string) {
    return this.httpService.post('/api/products/update/' + id, payload);
  }

  addStockProduct(payload: any) {
    return this.httpService.post('/api/products/addquantity', payload);
  }

  getOutOfStockList() {
    return this.httpService.post('/api/recommend/outofstock');
  }

  getOrderList(payload: any) {
    return this.httpService.post('/api/orders/getorder', payload);
  }

  getOrderListWithPaging(payload: any) {
    return this.httpService.post('/api/orders/getorderwithpaging', payload);
  }

  getOrderDetail(payload: any) {
    return this.httpService.post('/api/orders/getorderdetailadmin', payload);
  }

  verifyOrder(payload: any) {
    return this.httpService.post('/api/orders/verify', payload);
  }

  doneOrder(payload: any) {
    return this.httpService.post('/api/orders/done', payload);
  }

  cancelOrder(payload: any) {
    return this.httpService.post('/api/orders/cancel', payload);
  }

  searchUser(payload: any) {
    return this.httpService.post('/api/user/search', payload);
  }

  getUserDetail(payload: any) {
    return this.httpService.post('/api/user/getDetail', payload);
  }

  searchOrderForUser(payload: any) {
    return this.httpService.post('/api/user/searchorder', payload);
  }

  updateUserStatus(payload: any) {
    return this.httpService.post('/api/user/updatedisable', payload);
  }
}
