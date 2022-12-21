import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileServiceComponent } from './file-service.component';

describe('FileServiceComponent', () => {
  let component: FileServiceComponent;
  let fixture: ComponentFixture<FileServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
