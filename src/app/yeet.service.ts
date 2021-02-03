import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YeetService {
  private sound;
  constructor() {
    this.sound = new Audio();
    this.sound.src = 'assets/yeet.mp3';
  }

  play(): void {
    this.sound.load();
    this.sound.play();
  }
}
