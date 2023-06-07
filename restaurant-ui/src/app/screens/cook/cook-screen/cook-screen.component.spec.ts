import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookScreenComponent } from './cook-screen.component';

describe('CookScreenComponent', () => {
  let component: CookScreenComponent;
  let fixture: ComponentFixture<CookScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
