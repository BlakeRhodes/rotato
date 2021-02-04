import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private devs: string[] = [];
  private carriers: string[] = [];
  private pairs: string[][] = [];
  private devKey = 'devs';
  private pairsKey = 'pairs';
  private carriersKey = 'carriers';

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

  set(field: string, update: string[] | string[][]): void {
    localStorage.setItem(field, JSON.stringify(update));
    this[field] = update;
  }
}
