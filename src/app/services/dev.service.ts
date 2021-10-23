import { Injectable } from '@angular/core';
import { removeIfExists, replaceIfExists } from '../utillity/helper-methods';
import { notFound } from '../utillity/lulz';
import { Pair } from '../utillity/pair';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DevService {

  constructor(private localStorageService: LocalStorageService) { }

  update(oldValue: string, newValue: string): void {
    const updatedDevs = replaceIfExists(this.localStorageService.getDevs(), oldValue, newValue);
    this.localStorageService.setDevs(updatedDevs);

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

  delete(value: string): void {
    const updatedDevs = removeIfExists(this.localStorageService.getDevs(), value);
    this.localStorageService.setDevs(updatedDevs);

    const updatedDisabledDevs = removeIfExists(this.localStorageService.getDisabled(), value);

    if (!!updatedDisabledDevs) {
      this.localStorageService.setDisabled(updatedDisabledDevs);
    }

    const updatedCarryingDevs = removeIfExists(this.localStorageService.getCarriers(), value);
    if (!!updatedCarryingDevs) {
      this.localStorageService.setCarriers(updatedCarryingDevs);
    }

    const updatedPairs = this.removeDevInPairIfExists(this.localStorageService.getPairs(), value);
    if (!!updatedPairs) {
      this.localStorageService.setPairs(updatedPairs);
    }

    const updatedStickingPairs = this.removeDevInPairIfExists(this.localStorageService.getSticking(), value);
    if (!!updatedStickingPairs) {
      this.localStorageService.setSticking(updatedStickingPairs);
    }
  }

  toggleDisabled(value: string) {
    const disabledDevs = this.localStorageService.getDisabled();

    const toggledDevIndex = disabledDevs.indexOf(value);

    if (notFound(toggledDevIndex)) {
      disabledDevs.push(value);

      const updatedCarryingDevs = removeIfExists(this.localStorageService.getCarriers(), value);
      if (!!updatedCarryingDevs) {
        this.localStorageService.setCarriers(updatedCarryingDevs);
      }
    } else {
      disabledDevs.splice(toggledDevIndex, 1);
    }

    this.localStorageService.setDisabled(disabledDevs);
  }

  toggleCarrying(value: string) {
    const carryingDevs = this.localStorageService.getCarriers();

    const toggledDevIndex = carryingDevs.indexOf(value);

    if (notFound(toggledDevIndex)) {
      carryingDevs.push(value);

      const updatedDisabledDevs = removeIfExists(this.localStorageService.getDisabled(), value);
      if (!!updatedDisabledDevs) {
        this.localStorageService.setDisabled(updatedDisabledDevs);
      }
    } else {
      carryingDevs.splice(toggledDevIndex, 1);
    }

    this.localStorageService.setCarriers(carryingDevs);
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

  private removeDevInPairIfExists(pairs: Pair[], value: string): Pair[] {
    const pairIndex = pairs.findIndex(x => x.devs.includes(value));

    if (pairIndex < 0) {
      return null;
    }

    const devs = [...pairs[pairIndex].devs];
    if (devs.length <= 1) {
      pairs.splice(pairIndex, 1);
    } else {
      devs.splice(devs.indexOf(value), 1);
      pairs[pairIndex].devs = devs;
    }

    return pairs;
  }
}
