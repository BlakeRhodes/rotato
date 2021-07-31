import { NO_ERRORS_SCHEMA } from '@angular/core';
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
  const localStorageService = {
    setDevs: jest.fn(),
    setPairs: jest.fn(),
    setCarriers: jest.fn(),
    setDisabled: jest.fn(),
    setBoards: jest.fn(),
    setDisabledBoards: jest.fn(),
    setSticking: jest.fn(),
    saveState: jest.fn(),
    getTeamBoards: jest.fn()
  };
  const decodeService = {
    decode: jest.fn()
  };
  const router = {
    navigate: jest.fn()
  };
  const themeService = {
    getSharedPage: jest.fn()
  };
  const soundService = {
    heyListen: jest.fn()
  };
  const snackbar = {
    open: jest.fn()
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SharedComponent],
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
