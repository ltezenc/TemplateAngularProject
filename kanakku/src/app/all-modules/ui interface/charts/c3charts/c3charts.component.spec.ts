import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C3chartsComponent } from './c3charts.component';

describe('C3chartsComponent', () => {
  let component: C3chartsComponent;
  let fixture: ComponentFixture<C3chartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C3chartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(C3chartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
