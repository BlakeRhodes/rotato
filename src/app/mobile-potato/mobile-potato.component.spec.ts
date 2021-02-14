import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePotatoComponent } from './mobile-potato.component';

describe('MobilePotatoComponent', () => {
  let component: MobilePotatoComponent;
  let fixture: ComponentFixture<MobilePotatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilePotatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilePotatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
