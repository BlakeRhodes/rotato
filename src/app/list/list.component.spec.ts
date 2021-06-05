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

  const localStorageService = jasmine.createSpyObj('LocalStorageService', [
    'add',
    'get',
    'set'
  ]);
  const soundService = jasmine.createSpyObj('SoundService', ['dropPop', 'doAYeet']);
  const themeService = jasmine.createSpyObj('ThemeService', [
    'getSelected',
    'getListItem',
    'getInputColor'
  ]);
  const devService = jasmine.createSpyObj('DevService', ['delete', 'update']);
  const boardService = jasmine.createSpyObj('BoardService', ['delete', 'update']);
  const refreshService = jasmine.createSpyObj('RefreshService', ['triggerRefresh']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
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
