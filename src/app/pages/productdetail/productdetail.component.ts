import { ConstantPool } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { take, tap } from 'rxjs';
import { AddProductPopupComponent } from 'src/app/common/pop-up/add-product-popup/add-product-popup.component';
import { ApiService } from 'src/app/service/api.service';
import { ErrorService } from 'src/app/service/error.service';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductdetailComponent implements OnInit, OnDestroy {
  productId: string = '';

  sections: any[] = [];
  editor: Editor;

  isEditMode: boolean = false;

  // DropDown value
  catDropDownData = CatDropDownList;
  brandDropDownData = BrandDropDownList;
  infoDropDownData = InfoList;
  selectedCategory: string = '';
  selectedBrand: string = '';
  selectedInfo: string = '';

  infoList: string[] = [];

  descText: string = '';
  // Data Product
  title: string = '';
  FileImg: any;
  productImg: any;
  priceValue: number;
  infoText: string = '';
  inStock: number;

  changeFile: boolean = false;

  isAddProductMode: boolean = false;

  dialogRef: MatDialogRef<AddProductPopupComponent> | undefined;

  constructor(
    private route: Router,
    private apiService: ApiService,
    private msgService: ErrorService,
    private fireStorage: AngularFireStorage,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getProductId();
    this.getInitProductInfo().pipe(take(1)).subscribe();
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  getInitProductInfo() {
    const payload = {
      id: this.productId,
    };

    return this.apiService.getProductDetail(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.setProductInfo(response.product);
          this.convertArray(
            response.product.techInfo,
            response.catInfo[0].listTechInfo
          );
        } else {
          this.msgService.start(response.message);
        }
      })
    );
  }

  private setProductInfo(product: any) {
    this.selectedBrand = product.brand;
    this.infoList = product.info;
    this.selectedCategory = product.categories;
    this.productImg = product.img;
    this.title = product.title;
    this.priceValue = product.price;
    this.descText = product.desc;
    this.inStock = product.inStock;
  }

  private convertArray(arrayTechProduct: any[], catTechInfo: any[]) {
    let newArray = catTechInfo.map((cat) => {
      let newInfo = cat.info.map((info: any) => {
        let existingTech = arrayTechProduct.find((tech) =>
          tech.info.some((t: any) => t.name === info && t.value !== '')
        );
        let value = existingTech
          ? existingTech.info.find((t: any) => t.name === info).value
          : '';
        return { name: info, value };
      });

      return {
        title: cat.title,
        info: newInfo,
      };
    });

    this.sections = newArray;
  }

  deleteItem(item: any) {
    if (this.isEditMode) {
      this.infoList = this.infoList.filter((info) => info !== item);
    }
  }

  addItemToList() {
    this.infoList.push(this.infoText);
  }

  onChangeInfoDropDown() {
    const isExistingItem = this.infoList.some(
      (item) => item === this.selectedInfo
    );

    if (!isExistingItem) {
      this.infoList.push(this.selectedInfo);
    }
  }

  // File Control
  async onFileChange(event: any) {
    this.changeFile = true;
    this.FileImg = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.productImg = e.target.result; // Gán kết quả đọc hình ảnh vào biến productImage
    };

    reader.readAsDataURL(this.FileImg);
  }

  private getProductId() {
    const path = this.route.url.split('/');
    this.productId = path[2];
  }

  editModeChange() {
    this.isEditMode = !this.isEditMode;
  }

  async updateProduct() {
    this.loadingService.start();
    let payload;
    if (this.changeFile) {
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}_${this.FileImg.name}`;
      const path = `product/${fileName}`;
      const uploadTask = await this.fireStorage.upload(path, this.FileImg);
      const url = await uploadTask.ref.getDownloadURL();
      payload = {
        title: this.title,
        desc: this.descText,
        img: url,
        categories: this.selectedCategory,
        brand: this.selectedBrand,
        price: this.priceValue,
        info: this.infoList,
        techInfo: this.sections,
      };
    } else {
      payload = {
        title: this.title,
        desc: this.descText,
        categories: this.selectedCategory,
        brand: this.selectedBrand,
        price: this.priceValue,
        info: this.infoList,
        techInfo: this.sections,
      };
    }

    this.updateProductApi(payload).pipe(take(1)).subscribe();
  }

  updateProductApi(payload: any) {
    return this.apiService.updateProductDetail(payload, this.productId).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.loadingService.finish();
          this.msgService.startSuccess(
            'Thay Đổi Thông Tin Sản Phẩm Thành Công'
          );
        } else {
          this.loadingService.finish();
          this.msgService.start(response.message);
        }
      })
    );
  }

  addQuantity() {
    this.dialogRef = this.dialog.open(AddProductPopupComponent, {
      disableClose: true,
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result.code === 1) {
        this.callApiAddQuantity(result.quantity).pipe(take(1)).subscribe();
      } else {
      }
    });
  }

  callApiAddQuantity(quantity: number) {
    const payload = {
      id: this.productId,
      quantity: quantity,
    };

    return this.apiService.addStockProduct(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.msgService.startSuccess(response.message);
        } else {
          this.msgService.start(response.message);
        }
      })
    );
  }
}

const CatDropDownList = [
  { value: 'Laptop', name: 'Máy Tính Xách Tay' },
  { value: 'Airpod', name: 'Airpod' },
  { value: 'Speaker', name: 'Loa' },
  { value: 'Smartwatch', name: 'Đồng Hồ Thông Minh' },
  { value: 'Camera', name: 'Camera' },
  { value: 'Accessory', name: 'Phụ Kiện' },
];

const BrandDropDownList = [
  { value: 'Sony', name: 'Sony' },
  { value: 'Azur', name: 'Azur' },
  { value: 'Dell', name: 'Dell' },
  { value: 'Apple', name: 'Apple' },
  { value: 'Acer', name: 'Acer' },
  { value: 'Xiaomi', name: 'Xiaomi' },
  { value: 'Fitbit', name: 'Fitbit' },
  { value: 'Questek', name: 'Questek' },
  { value: 'Huawei', name: 'Huawei' },
  { value: 'Samsung', name: 'Samsung' },
  { value: 'Garmin', name: 'Garmin' },
  { value: 'monster', name: 'Monster' },
  { value: 'Asus', name: 'Asus' },
];

const InfoList = [
  {
    id: 1,
    value: 'Bảo hành 12 tháng',
  },
  {
    id: 2,
    value: 'Bảo hành 6 tháng',
  },
  {
    id: 3,
    value: 'Bảo hành 3 tháng',
  },
  {
    id: 4,
    value: 'Tặng kèm túi đựng Laptop',
  },
  {
    id: 5,
    value: 'Tặng kèm ốp lưng điện thoại',
  },
  {
    id: 6,
    value: 'Tặng kèm dây cắm xạc',
  },
];

const Fake_Cat_Info = [
  {
    title: 'Cấu Hình Sản Phẩm',
    info: [
      {
        name: 'Kích thước màn hình',
        value: '15.6 inch',
      },
      {
        name: 'Độ phân giải',
        value: '1920x1080',
      },
      {
        name: 'Hỗ trợ cảm ứng',
        value: 'Không',
      },
    ],
  },
  {
    title: 'Đồ họa và Âm thanh',
    info: [
      {
        name: 'VRAM card đồ hoạ rời',
        value: '6GB GDDR6',
      },
      {
        name: 'Công nghệ âm thanh',
        value: '2 loa 2W',
      },
      {
        name: 'Card đồ hoạ rời',
        value: 'NVIDIA GeForce RTX 4050',
      },
    ],
  },
];
