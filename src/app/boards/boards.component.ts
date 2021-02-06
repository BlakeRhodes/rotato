import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {createWebpackLoggingCallback} from '@angular-devkit/build-angular/src/webpack/utils/stats';
import {SoundService} from '../sound.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  boards: string[];
  disabledBoards: string[];
  constructor(
    private localStorageService: LocalStorageService,
    private soundService: SoundService,
  ) { }

  ngOnInit(): void {
    this.boards = this.localStorageService.getBoards();
    this.disabledBoards = this.localStorageService.getDisabledBoards();
  }

  handleAdd(board: string) {
    if (board !== '') {
      this.localStorageService.addBoard(board);
    }
    this.boards = this.localStorageService.getBoards();
  }

  handleDelete(i: number) {
    this.boards.splice(i, 1);
    this.localStorageService.setBoards(this.boards);
    this.boards = this.localStorageService.getBoards();
    this.soundService.doAYeet();
  }

  handleDisable(i: number, board: any) {
    const found = this.disabledBoards.findIndex(name => name === board);
    if (found === -1) {
      this.disabledBoards.push(board);
    } else {
      this.disabledBoards.splice(found, 1);
    }
    this.localStorageService.setDisabledBoards(this.disabledBoards);
  }

  isDisabled(board: any) {
    return !!this.disabledBoards.find(name => name === board);
  }
}
