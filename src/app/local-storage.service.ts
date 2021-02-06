import {Injectable} from '@angular/core';
import {Pair} from './pair';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly devs: string[] = [];
  private carriers: string[] = [];
  private pairs: Pair[] = [];
  private disabled: string[] = [];
  private boards: string[] = [];
  private disabledBoards: string[] = [];
  private enableSound: boolean;
  private devKey = 'devs';
  private pairsKey = 'pairs';
  private carriersKey = 'carriers';
  private disabledKey = 'disabled';
  private boardsKey = 'boards';
  private disabledBoardsKey = 'disabledBoards';
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

    const boards = localStorage.getItem(this.boardsKey);
    if (boards) {
      this.boards = JSON.parse(boards);
    }

    const disabledBoards = localStorage.getItem(this.disabledBoardsKey);
    if (disabledBoards) {
      this.disabledBoards = JSON.parse(disabledBoards);
    }

    const enableSound = localStorage.getItem(this.enableSoundKey);
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

  addBoard(name: string): void {
    this.boards.push(name);
    localStorage.setItem(this.boardsKey, JSON.stringify(this.boards));
  }

  getDevs(): string[] {
    return this.get(this.devKey) as string[];
  }

  getPairs(): Pair[] {
    let pairs = this.get(this.pairsKey) as Pair[];
    if(pairs[0]['board'] === undefined){
      return this.fixPairs();
    }
  }

  getCarriers(): string[] {
    return this.get(this.carriersKey) as string [];
  }

  getDisabled(): string[] {
    return this.get(this.disabledKey) as string [];
  }

  getBoards(): string[] {
    return this.get(this.boardsKey) as string [];
  }

  getDisabledBoards(): string[] {
    return this.get(this.disabledBoardsKey) as string [];
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

  setPairs(pairs: Pair[]): void {
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

  setBoards(value: string[]): void {
    this.set(this.boardsKey, value);
  }

  setDisabledBoards(value: string[]): void {
    this.set(this.disabledBoardsKey, value);
  }

  set(field: string, update: any): void {
    localStorage.setItem(field, JSON.stringify(update));
    this[field] = update;
  }

  private fixPairs() {
    let fixedPairs: Pair[] = [];
    this.get(this.pairsKey).forEach(pair => {
      fixedPairs.push(
        {
          board: '🥔 Hope you like Boards! 🥔',
          devs: pair as string[],
        }
      );
    });
    return fixedPairs;
  }
}
