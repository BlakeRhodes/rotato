import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BoardService } from '../services/board.service';
import { DevService } from '../services/dev.service';
import { LocalStorageService } from '../services/local-storage.service';
import { RefreshService } from '../services/refresh.service';
import { SoundService } from '../services/sound.service';
import { ThemeService } from '../services/theme.service';
import { DEV_TYPE } from '../utillity/constants';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  const localStorageService = {
    add: jest.fn(),
    get: jest.fn(),
    set: jest.fn()
  };
  const soundService = {
    dropPop: jest.fn(),
    doAYeet: jest.fn()
  };
  const themeService = {
    getSelected: jest.fn(),
    getListItem: jest.fn(),
    getInputColor: jest.fn()
  };
  const devService = {
    delete: jest.fn(),
    update: jest.fn()
  };
  const boardService = {
    delete: jest.fn(),
    update: jest.fn()
  };
  const refreshService = new RefreshService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListComponent],
      imports: [MatDialogModule],
      providers: [
        {provide: LocalStorageService, useValue: localStorageService},
        {provide: SoundService, useValue: soundService},
        {provide: ThemeService, useValue: themeService},
        {provide: DevService, useValue: devService},
        {provide: BoardService, useValue: boardService},
        {provide: RefreshService, useValue: refreshService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    component.type = DEV_TYPE;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
