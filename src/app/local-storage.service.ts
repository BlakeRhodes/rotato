import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly devs: string[] = [];
  private carriers: string[] = [];
  private pairs: string[][] = [];
  private disabled: string[] = [];
  private devKey = 'devs';
  private pairsKey = 'pairs';
  private carriersKey = 'carriers';
  private disabledKey = 'disabled';

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
      this.carriers = JSON.parse(disabled);
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

  get(field: string): string[] | string[][] {
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

  set(field: string, update: string[] | string[][]): void {
    localStorage.setItem(field, JSON.stringify(update));
    this[field] = update;
  }
}
