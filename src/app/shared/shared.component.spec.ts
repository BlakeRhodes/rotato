import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DecodeService } from '../services/decode.service';
import { LocalStorageService } from '../services/local-storage.service';
import { SoundService } from '../services/sound.service';
import { ThemeService } from '../services/theme.service';

import { SharedComponent } from './shared.component';

describe('SharedComponent', () => {
  let component: SharedComponent;
  let fixture: ComponentFixture<SharedComponent>;

  const rawLink = '';
  const localStorageService = jasmine.createSpyObj('LocalStorageService', [
    'setDevs',
    'setPairs',
    'setCarriers',
    'setDisabled',
    'setBoards',
    'setDisabledBoards',
    'setSticking',
    'saveState',
    'getTeamBoards'
  ]);
  const decodeService = jasmine.createSpyObj('DecodeService', ['decode']);
  const router = jasmine.createSpyObj('Router', ['navigate']);
  const themeService = jasmine.createSpyObj('ThemeService', ['getSharedPage']);
  const soundService = jasmine.createSpyObj('SoundService', ['heyListen']);
  const snackbar = jasmine.createSpyObj('MatSnackBar', ['open']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedComponent ],
      imports: [MatDialogModule],
      providers: [
        {provide: ActivatedRoute, useValue: {queryParams: of({board: rawLink})}},
        {provide: LocalStorageService, useValue: localStorageService},
        {provide: DecodeService, useValue: decodeService},
        {provide: Router, useValue: router},
        {provide: ThemeService, useValue: themeService},
        {provide: SoundService, useValue: soundService},
        {provide: MatSnackBar, useValue: snackbar}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
