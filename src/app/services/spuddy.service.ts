import { Injectable } from '@angular/core';
import { SpuddyData } from '../utillity/spuddy-data';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SpuddyService {

  constructor(private localStorageService: LocalStorageService) { }

  getData(): SpuddyData {
    const pairs = this.localStorageService.getPairs();
    const sticking = this.localStorageService.getSticking();
    const carriers = this.localStorageService.getCarriers();
    const boards = this.localStorageService.getBoards();
    const disabledDevs = this.localStorageService.getDisabled();
    const disabledBoards = this.localStorageService.getDisabledBoards();
    const devs = this.localStorageService.getDevs();

    return new SpuddyData(pairs, sticking, carriers, boards, disabledDevs, disabledBoards, devs);
  }
}
