import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private devs: string[] = [];
  private key = 'devs';

  constructor() {
    const current = localStorage.getItem(this.key);
    if (current) {
      this.devs = JSON.parse(current);
    }
  }

  addDev(name: string): void {
    this.devs.push(name);
    localStorage.setItem(this.key, JSON.stringify(this.devs));
  }

  getDevs(): string[] {
    const current = localStorage.getItem(this.key);
    if (current) {
      return JSON.parse(current);
    }
  }

  setDevs(devs: string[]): void {
    localStorage.setItem(this.key, JSON.stringify(devs));
    this.devs = devs;
  }
}
