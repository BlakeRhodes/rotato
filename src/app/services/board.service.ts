import { Injectable } from '@angular/core';
import { removeIfExists, replaceIfExists } from '../utillity/helper-methods';
import { LocalStorageService } from './local-storage.service';
import { Pair } from '../utillity/pair';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private localStorageService: LocalStorageService) { }

  update(oldValue: string, newValue: string): void {
    const updatedBoards = replaceIfExists(this.localStorageService.getBoards(), oldValue, newValue);
    this.localStorageService.setBoards(updatedBoards);

    const updatedDisabledBoards = replaceIfExists(this.localStorageService.getDisabledBoards(), oldValue, newValue);
    if (!!updatedDisabledBoards) {
      this.localStorageService.setDisabledBoards(updatedDisabledBoards);
    }

    const updatedPairs = this.replaceBoardInPairIfExists(this.localStorageService.getPairs(), oldValue, newValue);
    if (!!updatedPairs) {
      this.localStorageService.setPairs(updatedPairs);
    }

    const updatedStickingPairs = this.replaceBoardInPairIfExists(this.localStorageService.getSticking(), oldValue, newValue);
    if (!!updatedStickingPairs) {
      this.localStorageService.setSticking(updatedStickingPairs);
    }
  }

  delete(value: string): void {
    const updatedBoards = removeIfExists(this.localStorageService.getBoards(), value);
    this.localStorageService.setBoards(updatedBoards);

    const updatedDisabledBoards = removeIfExists(this.localStorageService.getDisabledBoards(), value);
    if (!!updatedDisabledBoards) {
      this.localStorageService.setDisabledBoards(updatedDisabledBoards);
    }

    const updatedPairs = this.removeBoardInPairIfExists(this.localStorageService.getPairs(), value);
    if (!!updatedPairs) {
      this.localStorageService.setPairs(updatedPairs);
    }

    const updatedStickingPairs = this.removeBoardInPairIfExists(this.localStorageService.getSticking(), value);
    if (!!updatedStickingPairs) {
      this.localStorageService.setSticking(updatedStickingPairs);
    }
  }

  private replaceBoardInPairIfExists(pairs: Pair[], oldValue: string, newValue: string): Pair[] {
    const pairIndex = pairs.findIndex(x => x.board === oldValue);

    if (pairIndex < 0) {
      return null;
    }

    pairs[pairIndex].board = newValue;

    return pairs;
  }

  private removeBoardInPairIfExists(pairs: Pair[], value: string): Pair[] {
    return this.replaceBoardInPairIfExists(pairs, value, undefined);
  }
}
