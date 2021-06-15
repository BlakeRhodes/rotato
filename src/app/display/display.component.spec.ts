import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxCaptureService } from 'ngx-capture';
import { LocalStorageService } from '../services/local-storage.service';
import { RefreshService } from '../services/refresh.service';
import { RotationService } from '../services/rotation.service';
import { SoundService } from '../services/sound.service';
import { SpuddyService } from '../services/spuddy.service';
import { ThemeService } from '../services/theme.service';

import { DisplayComponent } from './display.component';

describe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;

  const localStorageService = {
    setPairs: jest.fn(),
    setCarriers: jest.fn(),
    setSticking: jest.fn()
  };
  const soundService = {
    spinning: jest.fn(),
    dropPop: jest.fn(),
    doAYeet: jest.fn()
  };
  const rotationService = {
    makeItRotato: jest.fn()
  };
  const themeService = {
    getSelected: jest.fn(),
    getPairCard: jest.fn(),
    devCard: jest.fn(),
    getSpuddies: jest.fn()
  };
  const captureService = {
    getImage: jest.fn()
  };
  const refreshService = new RefreshService();
  const spuddyService = {
    getData: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DisplayComponent],
      imports: [MatDialogModule],
      providers: [
        {provide: LocalStorageService, useValue: localStorageService},
        {provide: SoundService, useValue: soundService},
        {provide: RotationService, useValue: rotationService},
        {provide: ThemeService, useValue: themeService},
        {provide: NgxCaptureService, useValue: captureService},
        {provide: RefreshService, useValue: refreshService},
        {provide: SpuddyService, useValue: spuddyService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    spuddyService.getData.mockReturnValue({
      pairs: [],
      sticking: [],
      carriers: [],
      boards: [],
      disabledDevs: [],
      disabledBoards: [],
      devs: []
    });

    fixture = TestBed.createComponent(DisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
