import {Injectable} from '@angular/core';
import {Pair} from '../utillity/pair';
import {CURRENT_DATA_VERSION, TEAM_BOARDS_KEY, THEME_KEY} from '../utillity/constants';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {TeamBoard} from '../utillity/team-board';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private enableSound: boolean;
  private devKey = 'devs';
  private pairsKey = 'pairs';
  private carriersKey = 'carriers';
  private disabledKey = 'disabled';
  private boardsKey = 'boards';
  private disabledBoardsKey = 'disabledBoards';
  private enableSoundKey = 'enableSound';
  private versionKey = 'version';
  private stickingKey = 'sticking';

  constructor(
    private databaseService: NgxIndexedDBService,
  ) {
    const version = localStorage.getItem(this.versionKey);
    const theme = localStorage.getItem(THEME_KEY);
    if (!theme) {
      localStorage.setItem(THEME_KEY, 'classic');
    }
    console.log(version);
    if (version !== CURRENT_DATA_VERSION) {
      localStorage.setItem(this.versionKey, CURRENT_DATA_VERSION);
    }

    const enableSound = localStorage.getItem(this.enableSoundKey);
    if (enableSound) {
      this.enableSound = JSON.parse(enableSound);
    } else {
      this.enableSound = true;
      localStorage.setItem(this.enableSoundKey, 'true');
    }
  }

  getTeamBoards(): Observable<any> {
    return this.databaseService.getAll(TEAM_BOARDS_KEY)
      .pipe(
        map(project => project.map(value => value.name))
      );
  }

  saveState(name: string): Subscription {
    if (!name){
      return;
    }
    const teamBoard: TeamBoard = {
      name,
      version: CURRENT_DATA_VERSION,
      devs: this.getDevs(),
      pairs: this.getPairs(),
      carriers: this.getCarriers(),
      disabled: this.getDisabled(),
      boards: this.getBoards(),
      disabledBoards: this.getDisabledBoards(),
      sticking: this.getSticking(),
    };

    const value = JSON.stringify(teamBoard);

    return this.databaseService.getByIndex(TEAM_BOARDS_KEY, 'name', name)
      .subscribe(next => {
        if (next) {
          return this.databaseService.update(
            TEAM_BOARDS_KEY,
            {
              id: next.id,
              name: next.name,
              value,
            }
          ).subscribe();
        } else {
          return this.databaseService.add(
            TEAM_BOARDS_KEY,
            {
              name: teamBoard.name,
              value,
            }
          ).subscribe();
        }
      });
  }

  loadState(name: string): Subscription {
    return this.databaseService.getByIndex(TEAM_BOARDS_KEY, 'name', name)
      .subscribe(result => {
        const teamBoard: TeamBoard = JSON.parse(result.value) as TeamBoard;
        this.setDevs(teamBoard.devs);
        this.setPairs(teamBoard.pairs);
        this.setCarriers(teamBoard.carriers);
        this.setDisabled(teamBoard.disabled);
        this.setBoards(teamBoard.boards);
        this.setDisabledBoards(teamBoard.disabledBoards);
        this.setSticking(teamBoard.sticking);
      });
  }

  deleteState(name: string): Subscription {
    return this.databaseService.getByIndex(TEAM_BOARDS_KEY, 'name', name)
      .subscribe(next => {
        this.databaseService.delete(TEAM_BOARDS_KEY, next.id).subscribe();
      });
  }

  addDev(name: string): void {
    this.add(this.devKey, name);
  }

  addBoard(name: string): void {
    this.add(this.boardsKey, name);
  }

  add(key: string, value: any): void {
    const values = this.get(key);
    values.push(value);
    localStorage.setItem(key, JSON.stringify(values));
  }

  getDevs(): string[] {
    return this.get(this.devKey) as string[];
  }

  getPairs(): Pair[] {
    return this.get(this.pairsKey) as Pair[];
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

  getSticking(): Pair[] {
    return this.get(this.stickingKey) as Pair [];
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

  setSticking(value: Pair[]): void {
    this.set(this.stickingKey, value);
  }

  set(field: string, update: any): void {
    localStorage.setItem(field, JSON.stringify(update));
  }
}
