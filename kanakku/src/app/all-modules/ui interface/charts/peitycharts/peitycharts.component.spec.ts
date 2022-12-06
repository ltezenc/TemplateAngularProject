import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeitychartsComponent } from './peitycharts.component';

describe('PeitychartsComponent', () => {
  let component: PeitychartsComponent;
  let fixture: ComponentFixture<PeitychartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeitychartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeitychartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
