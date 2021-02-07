import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {SoundService} from '../sound.service';
import {notFound} from '../lulz';
import {DELETE_BUTTON_TEXT} from '../constants';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  boards: string[];
  disabledBoards: string[];
  boardPlaceHolder = 'Frank\'s House of Refactors';
  inputLabel = "Board Name";
  deleteText = DELETE_BUTTON_TEXT;

  constructor(
    private localStorageService: LocalStorageService,
    private soundService: SoundService,
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
}
