import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookCardComponent } from './cook-card.component';

describe('CookCardComponent', () => {
  let component: CookCardComponent;
  let fixture: ComponentFixture<CookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
