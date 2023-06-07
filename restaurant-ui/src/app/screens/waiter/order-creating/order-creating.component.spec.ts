import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCreatingComponent } from './order-creating.component';

describe('OrderCreatingComponent', () => {
  let component: OrderCreatingComponent;
  let fixture: ComponentFixture<OrderCreatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCreatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
