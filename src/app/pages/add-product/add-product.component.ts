import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { take, tap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { Editor } from 'ngx-editor';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  sections: any[] = [];
  editor: Editor;

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

  // Check Validate
  isCat: boolean = false;
  isBrand: boolean = false;

  constructor(
    private apiService: ApiService,
    private fireStorage: AngularFireStorage,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  checkValue() {
    console.log(this.descText);
  }

  getFormattedDescText() {
    return this.descText.replace(/\n/g, '<br>');
  }

  // Category Control
  onCategoryChange() {
    this.isCat = true;
    this.getCategoryInfo().pipe(take(1)).subscribe(); // Hoặc làm bất kỳ thao tác nào bạn muốn với giá trị được chọn
  }

  onBrandChange() {
    this.isBrand = true;
  }

  //  Info Control
  onChangeInfoDropDown() {
    const isExistingItem = this.infoList.some(
      (item) => item === this.selectedInfo
    );

    if (!isExistingItem) {
      this.infoList.push(this.selectedInfo);
    }
  }

  deleteItem(item: any) {
    this.infoList = this.infoList.filter((info) => info !== item);
  }

  addItemToList() {
    this.infoList.push(this.infoText);
  }

  // File Control
  async onFileChange(event: any) {
    this.FileImg = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.productImg = e.target.result; // Gán kết quả đọc hình ảnh vào biến productImage
    };

    reader.readAsDataURL(this.FileImg);
  }

  getCategoryInfo() {
    const payload = {
      catname: this.selectedCategory,
    };
    return this.apiService.getCategoryInfo(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          if (response.catInfo[0]?.listTechInfo) {
            this.sections = response.catInfo[0]?.listTechInfo?.map(
              (item: any) => {
                const newItem = {
                  title: item.title,
                  info: item.info.map((infoItem: any) => ({
                    name: infoItem,
                    value: '',
                  })),
                };
                return newItem;
              }
            );
          } else {
            this.sections = [];
          }
        } else {
          console.log(response);

          // this.loadingService.finish();
        }
      })
    );
  }

  async createProduct() {
    if (
      this.isBrand &&
      this.isCat &&
      this.title &&
      this.priceValue !== 0 &&
      this.FileImg
    ) {
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}_${this.FileImg.name}`;
      const path = `product/${fileName}`;
      const uploadTask = await this.fireStorage.upload(path, this.FileImg);
      const url = await uploadTask.ref.getDownloadURL();
      const payload = {
        title: this.title,
        desc: this.descText,
        img: url,
        categories: this.selectedCategory,
        brand: this.selectedBrand,
        price: this.priceValue,
        info: this.infoList,
        techInfo: this.sections,
      };
      this.createNewProductApi(payload).pipe(take(1)).subscribe();
    } else {
      this.errorService.start('Hãy Điền Đầy Đủ Thông Tin');
    }
  }

  private createNewProductApi(payload: any) {
    return this.apiService.addNewProduct(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.errorService.startSuccess('Đăng ký hàng thành công');
        } else {
          this.errorService.start(response.message);
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
  { value: 'LG', name: 'LG' },
  { value: 'Samsung', name: 'Samsung' },
  { value: 'Garmin', name: 'Garmin' },
  { value: 'monster', name: 'Monster' },
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
