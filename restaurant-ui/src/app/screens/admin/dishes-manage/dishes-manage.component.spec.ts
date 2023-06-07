import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesManageComponent } from './dishes-manage.component';

describe('DishesManageComponent', () => {
  let component: DishesManageComponent;
  let fixture: ComponentFixture<DishesManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishesManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
