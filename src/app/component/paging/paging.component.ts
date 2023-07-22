import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css'],
})
export class PagingComponent implements OnChanges {
  @Input() total: number;
  @Input() numberPerPage: number;
  @Input() pagingType: string = 'bottom';
  @Input() currentPage: number;

  @Output() ChangePage: EventEmitter<number> = new EventEmitter<number>();

  totalPages: number = 0;

  pages: number[];
  visiblePages: number[];

  ngOnChanges(): void {
    this.calculateTotalPages();
    this.updatePages();
  }

  private updatePages(): void {
    this.pages = this.calculatePages();
    this.visiblePages = this.calculateVisiblePages();
  }

  private calculateTotalPages(): void {
    // this.currentPage = 1;
    this.totalPages = Math.ceil(this.total / this.numberPerPage);
  }

  private calculatePages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  private calculateVisiblePages(): number[] {
    if (this.totalPages <= 4) {
      return this.pages;
    }

    let startPage: number;
    let endPage: number;

    if (this.currentPage <= 2) {
      startPage = 1;
      endPage = 3;
    } else if (this.currentPage >= this.totalPages - 1) {
      startPage = this.totalPages - 2;
      endPage = this.totalPages;
    } else {
      startPage = this.currentPage - 1;
      endPage = this.currentPage + 1;
    }

    return this.pages.slice(startPage - 1, endPage);
  }

  // currentPage: number = 1;

  // Tạo một mảng chứa các số trang để hiển thị
  // get pages(): number[] {
  //   const pages = [];
  //   for (let i = 1; i <= this.totalPages; i++) {
  //     pages.push(i);
  //   }
  //   return pages;
  // }

  // Handler khi người dùng chọn một trang
  onPageClick(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.ChangePage.emit(pageNumber);
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    } else if (this.currentPage === 1) {
      this.currentPage = this.totalPages;
    }
    this.ChangePage.emit(this.currentPage);
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if ((this.currentPage = this.totalPages)) {
      this.currentPage = 1;
    }
    this.ChangePage.emit(this.currentPage);
  }

  // get visiblePages(): number[] {
  //   if (this.totalPages <= 4) {
  //     return this.pages;
  //   }

  //   let startPage: number;
  //   let endPage: number;

  //   if (this.currentPage <= 2) {
  //     startPage = 1;
  //     endPage = 3;
  //   } else if (this.currentPage >= this.totalPages - 1) {
  //     startPage = this.totalPages - 2;
  //     endPage = this.totalPages;
  //   } else {
  //     startPage = this.currentPage - 1;
  //     endPage = this.currentPage + 1;
  //   }

  //   return this.pages.slice(startPage - 1, endPage);
  // }
}
