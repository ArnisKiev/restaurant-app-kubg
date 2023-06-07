import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingNewEmployeeComponent } from './adding-new-employee.component';

describe('AddingNewEmployeeComponent', () => {
  let component: AddingNewEmployeeComponent;
  let fixture: ComponentFixture<AddingNewEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingNewEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingNewEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
