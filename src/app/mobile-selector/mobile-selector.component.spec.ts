import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSelectorComponent } from './mobile-selector.component';

describe('MobileStepperComponent', () => {
  let component: MobileSelectorComponent;
  let fixture: ComponentFixture<MobileSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
