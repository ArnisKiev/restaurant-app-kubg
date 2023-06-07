import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparingDishesComponent } from './preparing-dishes.component';

describe('PreparingDishesComponent', () => {
  let component: PreparingDishesComponent;
  let fixture: ComponentFixture<PreparingDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreparingDishesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreparingDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
