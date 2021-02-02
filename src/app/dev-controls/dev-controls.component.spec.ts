import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevControlsComponent } from './dev-controls.component';

describe('DevControlsComponent', () => {
  let component: DevControlsComponent;
  let fixture: ComponentFixture<DevControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
