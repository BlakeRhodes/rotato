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

  const localStorageService = jasmine.createSpyObj('LocalStorageService', [
    'setPairs',
    'setCarriers',
    'setSticking'
  ]);
  const soundService = jasmine.createSpyObj('SoundService', [
    'spinning',
    'dropPop',
    'doAYeet'
  ]);
  const rotationService = jasmine.createSpyObj('RotationService', ['makeItRotato']);
  const themeService = jasmine.createSpyObj('ThemeService', [
    'getSelected',
    'getPairCard',
    'devCard',
    'getSpuddies'
  ]);
  const captureService = jasmine.createSpyObj('NgxCaptureService', ['getImage']);
  const refreshService = new RefreshService();
  const spuddyService = jasmine.createSpyObj('SpuddyService', ['getData']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayComponent ],
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
    spuddyService.getData.and.returnValue({
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
