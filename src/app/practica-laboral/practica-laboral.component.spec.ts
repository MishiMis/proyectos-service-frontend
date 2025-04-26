import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticaLaboralComponent } from './practica-laboral.component';

describe('PracticaLaboralComponent', () => {
  let component: PracticaLaboralComponent;
  let fixture: ComponentFixture<PracticaLaboralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticaLaboralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
