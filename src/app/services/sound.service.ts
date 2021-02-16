import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private yeet = new Audio('assets/yeet.mp3');
  private hey = new Audio('assets/hey-listen.mp3');
  private spin = new Audio('assets/spin.mp3');
  private pop = new Audio('assets/pop.mp3');
  soundEnabled = false;

  constructor(private localStorageService: LocalStorageService) {
    this.soundEnabled = localStorageService.getEnableSound();
  }


  doAYeet(): void {
    if (this.soundEnabled) {
      this.yeet.load();
      this.yeet.play().then();
    }
  }

  heyListen(): void {
    if (this.soundEnabled) {
      this.hey.load();
      this.hey.play().then();
    }
  }

  spinning(): void {
    if (this.soundEnabled) {
      this.spin.load();
      this.spin.play().then();
    }
  }

  dropPop(): void {
    if (this.soundEnabled) {
      this.pop.load();
      this.pop.play().then();
    }
  }
}
