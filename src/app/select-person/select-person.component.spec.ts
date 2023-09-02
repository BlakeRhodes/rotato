import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SelectPersonComponent } from './select-person.component';

describe('SelectPersonComponent', () => {
  let component: SelectPersonComponent;
  let fixture: ComponentFixture<SelectPersonComponent>;

  const dialogData: any = {
    message: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPersonComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: dialogData }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
