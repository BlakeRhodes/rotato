import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private yeet = new Audio();
  private hey = new Audio();
  private soundEnabled = false;

  constructor(private localStorageService: LocalStorageService) {
    this.hey.src = 'assets/hey-listen.mp3';
    this.yeet.src = 'assets/yeet.mp3';
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

  set enableSound(checked: boolean) {
    this.soundEnabled = checked;
  }
}
