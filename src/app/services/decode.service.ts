import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {TeamBoard} from '../utillity/team-board';
import {CURRENT_DATA_VERSION} from '../utillity/constants';

@Injectable({
  providedIn: 'root'
})
export class DecodeService {

  constructor(
    private localStorageService: LocalStorageService,
  ) {
  }

  encode(): string {
    const teamBoard: TeamBoard = {
      name: 'Shared Board',
      version: CURRENT_DATA_VERSION,
      devs: this.localStorageService.getDevs(),
      pairs: this.localStorageService.getPairs(),
      carriers: this.localStorageService.getCarriers(),
      disabled: this.localStorageService.getDisabled(),
      boards: this.localStorageService.getBoards(),
      disabledBoards: this.localStorageService.getDisabledBoards(),
      sticking: this.localStorageService.getSticking(),
    };
    return encodeURIComponent(
      btoa(
        JSON.stringify(teamBoard)
      )
    );
  }

  decode(value: string): TeamBoard {
    return JSON.parse(
      atob(
        decodeURIComponent(value)
      )
    );
  }
}
