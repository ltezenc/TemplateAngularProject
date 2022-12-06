import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorrischartsComponent } from './morrischarts.component';

describe('MorrischartsComponent', () => {
  let component: MorrischartsComponent;
  let fixture: ComponentFixture<MorrischartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MorrischartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorrischartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
