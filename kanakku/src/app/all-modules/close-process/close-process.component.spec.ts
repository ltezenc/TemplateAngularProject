import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseProcessComponent } from './close-process.component';

describe('CloseProcessComponent', () => {
  let component: CloseProcessComponent;
  let fixture: ComponentFixture<CloseProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
