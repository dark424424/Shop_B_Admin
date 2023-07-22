import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InprogressOrderPageComponent } from './inprogress-order-page.component';

describe('InprogressOrderPageComponent', () => {
  let component: InprogressOrderPageComponent;
  let fixture: ComponentFixture<InprogressOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InprogressOrderPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InprogressOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
