import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlotchartsComponent } from './flotcharts.component';

describe('FlotchartsComponent', () => {
  let component: FlotchartsComponent;
  let fixture: ComponentFixture<FlotchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlotchartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlotchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
