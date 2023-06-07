import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingNewDishComponent } from './adding-new-dish.component';

describe('AddingNewDishComponent', () => {
  let component: AddingNewDishComponent;
  let fixture: ComponentFixture<AddingNewDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingNewDishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingNewDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
