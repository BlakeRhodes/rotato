import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {Pair} from './pair';
import {shuffle} from './lulz';

@Injectable({
  providedIn: 'root'
})
export class RotationService {

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  makeItRotato(): Pair[]{
    const carriers = this.localStorageService.getCarriers();
    let devs = this.localStorageService.getDevs();
    let boards = this.localStorageService.getBoards();
    const disabled = this.localStorageService.getDisabled();
    const disabledBoards = this.localStorageService.getDisabledBoards()
    const sticking = this.localStorageService.getSticking();
    const stickingBoards = sticking.map(pair => pair.board);
    const stickingDevs = sticking.flatMap(pair => pair.devs);
    const pairs = sticking;

    devs = devs.filter(dev => !disabled.includes(dev));
    devs = devs.filter(dev => !stickingDevs.includes(dev));
    devs = devs.filter(dev => !carriers.includes(dev));
    boards = boards.filter(board => !disabledBoards.includes(board));
    boards = boards.filter(board => !stickingBoards.includes(board));


    shuffle(boards);
    shuffle(devs);

    for (const carrier of carriers) {
      const partner = devs.splice(0, 1)[0];
      if (partner) {
        pairs.push(
          {
            board: boards.pop(),
            devs:
              [carrier, partner]
          }
        );
      } else {
        pairs.push(
          {
            board: boards.pop(),
            devs:
              [carrier]
          }
        );
      }
    }

    if (devs.length % 2 !== 0) {
      devs.push(null);
    }

    for (let i = 0; i < devs.length / 2; i++) {
      const firstIndex = i * 2;
      const secondIndex = firstIndex + 1;
      const pair: string[] = [devs[firstIndex]];
      const partner = devs[secondIndex];
      if (partner) {
        pair.push(partner);
      }
      pairs.push(
        {
          board: boards.pop(),
          devs: pair
        }
      );
    }

    return pairs;
  }
}
