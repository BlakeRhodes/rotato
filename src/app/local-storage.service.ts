import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private devs: string[] = [];
  private pairs: string[][] = [];
  private devKey = 'devs';
  private pairsKey = 'pairs';

  constructor() {
    const devs = localStorage.getItem(this.devKey);
    if (devs) {
      this.devs = JSON.parse(devs);
    }
    const pairs = localStorage.getItem(this.devKey);
    if (pairs) {
      this.devs = JSON.parse(pairs);
    }
  }

  addDev(name: string): void {
    this.devs.push(name);
    localStorage.setItem(this.devKey, JSON.stringify(this.devs));
  }

  getDevs(): string[] {
    const current = localStorage.getItem(this.devKey);
    if (current) {
      return JSON.parse(current);
    }
    return [];
  }

  setDevs(devs: string[]): void {
    localStorage.setItem(this.devKey, JSON.stringify(devs));
    this.devs = devs;
  }

  setPairs(pairs: string[][]): void {
    localStorage.setItem(this.pairsKey, JSON.stringify(pairs));
    this.pairs = pairs;
  }

  getPairs(): string[][] {
    const current = localStorage.getItem(this.pairsKey);
    if (current) {
      return JSON.parse(current);
    }
    return [];
  }
}
