import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { DecodeService } from '../services/decode.service';
import { LocalStorageService } from '../services/local-storage.service';
import { SoundService } from '../services/sound.service';
import { ThemeService } from '../services/theme.service';
import {Clipboard} from '@angular/cdk/clipboard';
import { MenuComponent } from './menu.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  const themeService = {
    getTheme: jest.fn()
  };
  const localStorageService = {
    getAllowSolo: jest.fn(),
    getVolume: jest.fn(),
    getTeamBoards: jest.fn(),
    setSoundEnabled: jest.fn(),
    loadState: jest.fn(),
    saveState: jest.fn(),
    deleteState: jest.fn(),
    setAllowSolo: jest.fn()
  };
  const decodeService = {
    encode: jest.fn()
  };
  const soundService = {
    soundEnabled: jest.fn(),
    heyListen: jest.fn(),
    setVolume: jest.fn()
  };
  const snackbar = {
    open: jest.fn()
  };
  const clipboard = {
    copy: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MenuComponent],
      imports: [MatDialogModule, MatMenuModule],
      providers: [
        {provide: ThemeService, useValue: themeService},
        {provide: LocalStorageService, useValue: localStorageService},
        {provide: DecodeService, useValue: decodeService},
        {provide: SoundService, useValue: soundService},
        {provide: MatSnackBar, useValue: snackbar},
        {provide: Clipboard, useValue: clipboard}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorageService.getTeamBoards.mockReturnValue(of([]));

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
