import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ScreenshotComponent } from './screenshot.component';

describe('ScreenshotComponent', () => {
  let component: ScreenshotComponent;
  let fixture: ComponentFixture<ScreenshotComponent>;

  const dialogData: any = {
    image: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenshotComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: dialogData}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
