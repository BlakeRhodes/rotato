import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private yeet = new Audio();
  private hey = new Audio();
  private spin = new Audio();
  private pop = new Audio();
  private soundEnabled = false;

  constructor(private localStorageService: LocalStorageService) {
    this.hey.src = 'assets/hey-listen.mp3';
    this.yeet.src = 'assets/yeet.mp3';
    this.spin.src = 'assets/spin.mp3';
    this.pop.src = 'assets/pop.mp3';
    this.soundEnabled = localStorageService.getEnableSound();
  }


  doAYeet(): void {
    if (this.soundEnabled) {
      this.yeet.load();
      this.yeet.play();
    }
  }

  heyListen(): void {
    if (this.soundEnabled) {
      this.hey.load();
      this.hey.play();
    }
  }

  spinning(): void {
    if (this.soundEnabled) {
      this.spin.load();
      this.spin.play();
    }
  }

  dropPop(): void {
    if (this.soundEnabled) {
      this.pop.load();
      this.pop.play();
    }
  }

  set enableSound(checked: boolean) {
    this.soundEnabled = checked;
  }
}
