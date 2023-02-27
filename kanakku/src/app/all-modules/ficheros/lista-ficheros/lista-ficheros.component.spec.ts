import { ComponentFixture, TestBed } from '@angular/core/testing';

import { listaFicherosComponent } from './lista-ficheros.component';

describe('ExpensesListComponent', () => {

  console.log("Hola mundo")
  let component: listaFicherosComponent;
  let fixture: ComponentFixture<listaFicherosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ listaFicherosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(listaFicherosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
