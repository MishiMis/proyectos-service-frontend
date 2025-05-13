import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosHeaderComponent } from './usuarios-header.component';

describe('UsuariosHeaderComponent', () => {
  let component: UsuariosHeaderComponent;
  let fixture: ComponentFixture<UsuariosHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
