import { Injectable } from '@angular/core';
import { replaceIfExists } from '../utillity/helper-methods';
import { Pair } from '../utillity/pair';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DevService {

  constructor(private localStorageService: LocalStorageService) { }

  update(oldValue: string, newValue: string): void {
    const updatedDevs = replaceIfExists(this.localStorageService.getDevs(), oldValue, newValue);
    if (!!updatedDevs) {
      this.localStorageService.setDevs(updatedDevs);
    }

    const updatedDisabledDevs = replaceIfExists(this.localStorageService.getDisabled(), oldValue, newValue);
    if (!!updatedDisabledDevs) {
      this.localStorageService.setDisabled(updatedDisabledDevs);
    }

    const updatedCarryingDevs = replaceIfExists(this.localStorageService.getCarriers(), oldValue, newValue);
    if (!!updatedCarryingDevs) {
      this.localStorageService.setCarriers(updatedCarryingDevs);
    }

    const updatedPairs = this.replaceDevInPairIfExists(this.localStorageService.getPairs(), oldValue, newValue);
    if (!!updatedPairs) {
      this.localStorageService.setPairs(updatedPairs);
    }

    const updatedStickingPairs = this.replaceDevInPairIfExists(this.localStorageService.getSticking(), oldValue, newValue);
    if (!!updatedStickingPairs) {
      this.localStorageService.setSticking(updatedStickingPairs);
    }
  }

  private replaceDevInPairIfExists(pairs: Pair[], oldValue: string, newValue: string): Pair[] {
    const pairIndex = pairs.findIndex(x => x.devs.includes(oldValue));

    if (pairIndex < 0) {
      return null;
    }

    const devs = pairs[pairIndex].devs;
    devs[devs.indexOf(oldValue)] = newValue;
    pairs[pairIndex].devs = devs;

    return pairs;
  }
}
