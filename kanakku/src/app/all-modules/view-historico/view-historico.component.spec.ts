import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistoricoComponent } from './view-historico.component';

describe('ViewHistoricoComponent', () => {
  let component: ViewHistoricoComponent;
  let fixture: ComponentFixture<ViewHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHistoricoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
