import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUserDashboardComponent } from './data-user-dashboard.component';

describe('DataUserDashboardComponent', () => {
  let component: DataUserDashboardComponent;
  let fixture: ComponentFixture<DataUserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataUserDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
