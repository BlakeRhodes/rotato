import {Component, Input, OnInit} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {SoundService} from '../services/sound.service';
import {notFound} from '../utillity/lulz';
import {DELETE_BUTTON_TEXT} from '../utillity/constants';
import {ThemeService} from '../services/theme.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  @Input()
  isMobile = false;

  boards: string[];
  disabledBoards: string[];
  boardPlaceHolder = 'Frank\'s House of Refactors';
  inputLabel = "Cutting Board Name";
  deleteText = DELETE_BUTTON_TEXT;

  constructor(
    private localStorageService: LocalStorageService,
    private soundService: SoundService,
    private themeService: ThemeService,
  ) {
  }

  ngOnInit(): void {
    this.boards = this.localStorageService.getBoards();
    this.disabledBoards = this.localStorageService.getDisabledBoards();
  }

  handleAdd(board: string) {
    if (board !== '') {
      this.localStorageService.addBoard(board);
      this.soundService.dropPop();
    }
    this.boards = this.localStorageService.getBoards();
  }

  handleDelete(i: number) {
    this.boards.splice(i, 1);
    this.localStorageService.setBoards(this.boards);
    this.soundService.doAYeet();
  }

  handleDisable(i: number, board: any) {
    const index = this.disabledBoards.findIndex(name => name === board);
    if (notFound(index)) {
      this.disabledBoards.push(board);
    } else {
      this.disabledBoards.splice(index, 1);
    }
    this.localStorageService.setDisabledBoards(this.disabledBoards);
  }

  isDisabled(board: string) {
    return this.disabledBoards.find(name => name === board);
  }

  getCurrentClass(board: string) {
    return this.isDisabled(board)? this.themeService.getSelected(): this.themeService.getBackground(5);
  }

  getFormColor(): string {
    return this.themeService.getFormColor();
  }

  getColor(): string {
    return this.themeService.getLabel();
  }

  getInputColor(): string {
    return this.themeService.getInput();
  }
}
