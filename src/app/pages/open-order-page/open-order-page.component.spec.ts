import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenOrderPageComponent } from './open-order-page.component';

describe('OpenOrderPageComponent', () => {
  let component: OpenOrderPageComponent;
  let fixture: ComponentFixture<OpenOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenOrderPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
