import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRecommedOutOfStockComponent } from './product-recommed-out-of-stock.component';

describe('ProductRecommedOutOfStockComponent', () => {
  let component: ProductRecommedOutOfStockComponent;
  let fixture: ComponentFixture<ProductRecommedOutOfStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRecommedOutOfStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductRecommedOutOfStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
