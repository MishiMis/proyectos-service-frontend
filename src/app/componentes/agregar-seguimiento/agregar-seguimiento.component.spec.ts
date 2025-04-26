import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSeguimientoComponent } from './agregar-seguimiento.component';

describe('AgregarSeguimientoComponent', () => {
  let component: AgregarSeguimientoComponent;
  let fixture: ComponentFixture<AgregarSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarSeguimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
