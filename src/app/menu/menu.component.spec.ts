import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { DecodeService } from '../services/decode.service';
import { LocalStorageService } from '../services/local-storage.service';
import { SoundService } from '../services/sound.service';
import { ThemeService } from '../services/theme.service';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  const themeService = jasmine.createSpyObj('ThemeService', ['getTheme']);
  const localStorageService = jasmine.createSpyObj('LocalStorageService', [
    'getAllowSolo',
    'getVolume',
    'getTeamBoards',
    'setSoundEnabled',
    'loadState',
    'saveState',
    'deleteState',
    'setAllowSolo'
  ]);
  const decodeService = jasmine.createSpyObj('DecodeService', ['encode']);
  const soundService = jasmine.createSpyObj('SoundService', [
    'soundEnabled',
    'heyListen',
    'setVolume'
  ]);
  const snackbar = jasmine.createSpyObj('MatSnackBar', ['open']);
  const clipboard = jasmine.createSpyObj('Clipboard', ['copy']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
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
    localStorageService.getTeamBoards.and.returnValue(of([]));

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
