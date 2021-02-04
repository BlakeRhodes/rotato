import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly devs: string[] = [];
  private carriers: string[] = [];
  private pairs: string[][] = [];
  private disabled: string[] = [];
  private enableSound: boolean;
  private devKey = 'devs';
  private pairsKey = 'pairs';
  private carriersKey = 'carriers';
  private disabledKey = 'disabled';
  private enableSoundKey = 'enableSound';

  constructor() {
    const devs = localStorage.getItem(this.devKey);
    if (devs) {
      this.devs = JSON.parse(devs);
    }
    const pairs = localStorage.getItem(this.pairsKey);
    if (pairs) {
      this.pairs = JSON.parse(pairs);
    }

    const carriers = localStorage.getItem(this.carriersKey);
    if (carriers) {
      this.carriers = JSON.parse(pairs);
    }

    const disabled = localStorage.getItem(this.disabledKey);
    if (disabled) {
      this.disabled = JSON.parse(disabled);
    }

    const enableSound = localStorage.getItem(this.enableSoundKey);
    console.log(enableSound);
    if (enableSound) {
      this.enableSound = JSON.parse(enableSound);
    } else {
      this.enableSound = true;
      localStorage.setItem(this.enableSoundKey, 'true');
    }
  }


  addDev(name: string): void {
    this.devs.push(name);
    localStorage.setItem(this.devKey, JSON.stringify(this.devs));
  }

  getDevs(): string[] {
    return this.get(this.devKey) as string[];
  }

  getPairs(): string[][] {
    return this.get(this.pairsKey) as string[][];
  }

  getCarriers(): string[] {
    return this.get(this.carriersKey) as string [];
  }

  getDisabled(): string[] {
    return this.get(this.disabledKey) as string [];
  }

  getEnableSound(): boolean {
    return this.get(this.enableSoundKey) as boolean;
  }

  get(field: string): any {
    const current = localStorage.getItem(field);
    if (current) {
      return JSON.parse(current);
    }
    return [];
  }

  setDevs(devs: string[]): void {
    this.set(this.devKey, devs);
  }

  setPairs(pairs: string[][]): void {
    this.set(this.pairsKey, pairs);
  }

  setCarriers(carriers: string[]): void {
    this.set(this.carriersKey, carriers);
  }

  setDisabled(disabled: string[]): void {
    this.set(this.disabledKey, disabled);
  }

  setSoundEnabled(value: boolean): void {
    this.set(this.enableSoundKey, value);
  }

  set(field: string, update: any): void {
    localStorage.setItem(field, JSON.stringify(update));
    this[field] = update;
  }
}
