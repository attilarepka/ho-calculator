import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCalendarWrapperComponent } from './mat-calendar-wrapper.component';

describe('MatCalendarWrapperComponent', () => {
  let component: MatCalendarWrapperComponent;
  let fixture: ComponentFixture<MatCalendarWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatCalendarWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatCalendarWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
