import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManagagingComponent } from './employee-managaging.component';

describe('EmployeeManagagingComponent', () => {
  let component: EmployeeManagagingComponent;
  let fixture: ComponentFixture<EmployeeManagagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeManagagingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeManagagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
