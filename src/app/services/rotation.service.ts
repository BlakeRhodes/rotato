import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {Pair} from '../utillity/pair';
import {shuffle} from '../utillity/lulz';

@Injectable({
  providedIn: 'root'
})
export class RotationService {

  constructor(
    private localStorageService: LocalStorageService,
  ) {
  }

  makeItRotato(): Pair[] {
    let devs = this.localStorageService.getDevs();
    let boards = this.localStorageService.getBoards();
    const disabled = this.localStorageService.getDisabled();
    const disabledBoards = this.localStorageService.getDisabledBoards();
    const sticking = this.localStorageService.getSticking();
    let carryingPairs = this.getCarryingPairs();

    const stickingBoards = sticking.map(pair => pair.board);
    const stickingDevs = sticking.flatMap(pair => pair.devs);
    const carriersInRotation = carryingPairs.flatMap(pair => pair.devs);
    const carryingBoardsInRotation = carryingPairs.map(pair => pair.board);

    const pairs = [...sticking];

    devs = devs.filter(dev => !disabled.includes(dev));
    devs = devs.filter(dev => !stickingDevs.includes(dev));
    devs = devs.filter(dev => !carriersInRotation.includes(dev));
    boards = boards.filter(board => !disabledBoards.includes(board));
    boards = boards.filter(board => !stickingBoards.includes(board));
    boards = boards.filter(board => !carryingBoardsInRotation.includes(board));
    carryingPairs = carryingPairs.filter(carryingPair =>
      stickingDevs.findIndex(dev => carryingPair.devs.includes(dev)) < 0
    );

    shuffle(carryingPairs);
    shuffle(boards);
    shuffle(devs);

    for (const pair of carryingPairs) {
      if (pair.devs.length < 2) {
        const dev = pair.devs[0];
        const partner = devs.splice(0, 1)[0];

        let board = pair.board;
        if (!board || disabledBoards.includes(board)) {
          board = boards.pop();
        }

        pairs.push(
          {
            board: board,
            devs:
              [dev, partner].filter(x => !!x)
          }
        );
      } else {
        pairs.push(pair);
      }
    }

    let solo: string;
    if (devs.length % 2 !== 0) {
      if (this.localStorageService.getAllowSolo()) {
        devs.push(null);
      } else {
        solo = devs.pop();
      }
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

    if (!this.localStorageService.getAllowSolo() && solo){
      pairs[0].devs.push(solo);
    }

    return pairs;
  }

  private getCarryingPairs(): Pair[] {
    const carriers = this.localStorageService.getCarriers();

    const carryingPairsFromPreviousRotation = this.localStorageService.getPairs()
      .filter(pair => carriers.findIndex(carrier => pair.devs.includes(carrier)) >= 0)
      .map(pair => <Pair>{board: pair.board, devs: pair.devs.filter(dev => carriers.includes(dev))});

    const remainingCarriers = carriers.filter(carrier => !carryingPairsFromPreviousRotation.flatMap(pair => pair.devs).includes(carrier))
      .map(carrier => <Pair>{board: undefined, devs: [carrier]});

    return carryingPairsFromPreviousRotation.concat(remainingCarriers);
  }
}
