import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOutOfStockComponent } from './product-out-of-stock.component';

describe('ProductOutOfStockComponent', () => {
  let component: ProductOutOfStockComponent;
  let fixture: ComponentFixture<ProductOutOfStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOutOfStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOutOfStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
