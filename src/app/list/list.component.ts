import {Component, Input, OnInit} from '@angular/core';
import {BACK_BURNER_MESSAGE, DEV_TYPE, BOARD_TYPE, DELETE_BUTTON_TEXT} from '../utillity/constants';
import {LocalStorageService} from '../services/local-storage.service';
import {SoundService} from '../services/sound.service';
import {ThemeService} from '../services/theme.service';
import {notFound} from '../utillity/lulz';
import {ListType} from '../utillity/list-type';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DevService } from '../services/dev.service';
import { BoardService } from '../services/board.service';
import { RefreshService } from '../services/refresh.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input()
  isMobile = false;
  @Input()
  type: ListType;

  list: string[];
  disabledList: string[];

  deleteText = DELETE_BUTTON_TEXT;
  backBurnerMessage = BACK_BURNER_MESSAGE;

  constructor(
    private localStorageService: LocalStorageService,
    private soundService: SoundService,
    private themeService: ThemeService,
    private dialog: MatDialog,
    private devService: DevService,
    private boardService: BoardService,
    private refreshService: RefreshService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  handleAdd(item: string): void {
    if (item !== '') {
      this.localStorageService.add(this.type.listKey, item);
      this.soundService.dropPop();
    }
    this.list = this.localStorageService.get(this.type.listKey);
  }

  handleDelete(i: number): void {
    this.list.splice(i, 1);
    this.localStorageService.set(this.type.listKey, this.list);
    this.soundService.doAYeet();
  }

  handleDisable(i: number, item: string): void {
    const index = this.disabledList.findIndex(name => name === item);
    if (notFound(index)) {
      this.disabledList.push(item);
    } else {
      this.disabledList.splice(index, 1);
    }
    this.localStorageService.set(this.type.disabledKey, this.disabledList);
  }

  handleEdit(i: number, item: string): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {type: this.type, name: item}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      switch (this.type) {
        case DEV_TYPE:
          this.devService.update(item, result);
          break;
        case BOARD_TYPE:
          this.boardService.update(item, result);
          break;
      }

      this.loadData();
      this.refreshService.triggerRefresh();
    });
  }

  isDisabled(item: string): string {
    return this.disabledList.find(name => name === item);
  }

  getCurrentClass(item: string): string {
    return this.isDisabled(item) ? this.themeService.getSelected() : this.themeService.getListItem();
  }

  getInputColor(): string {
    return this.themeService.getInputColor();
  }

  isStrikeThrough(dev: string): string {
    return this.isDisabled(dev) ? 'strike-through' : '';
  }

  private loadData(): void {
    this.list = this.localStorageService.get(this.type.listKey);
    this.disabledList = this.localStorageService.get(this.type.disabledKey);
  }
}
