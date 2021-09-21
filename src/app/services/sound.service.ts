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
  private volume: number;
  soundEnabled = false;

  constructor(private localStorageService: LocalStorageService) {
    this.soundEnabled = localStorageService.getEnableSound();
    this.volume = localStorageService.getVolume();
  }


  doAYeet(): void {
    this.play(this.yeet);
  }

  heyListen(): void {
    this.play(this.hey);
  }

  spinning(): void {
    this.play(this.spin);
  }

  dropPop(): void {
    this.play(this.pop);
  }

  setVolume(value: number): void {
    this.volume = value;
    this.localStorageService.setVolume(value);
  }

  private play(sound: HTMLAudioElement): void{
    if (this.soundEnabled) {
      sound.load();
      sound.volume = this.volume;
      sound.play()?.then();
    }
  }
}
