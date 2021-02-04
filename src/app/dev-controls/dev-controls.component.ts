import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {SoundService} from '../sound.service';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-dev-controls',
  templateUrl: './dev-controls.component.html',
  styleUrls: ['./dev-controls.component.css']
})
export class DevControlsComponent implements OnInit {
  devs: string[];

  constructor(
    private localStorageService: LocalStorageService,
    private soundService: SoundService,
  ) {
  }

  ngOnInit(): void {
    this.devs = this.localStorageService.getDevs();
  }

  handleAdd(value: string): void {
    if (value !== '') {
      this.localStorageService.addDev(value);
    }
    this.devs = this.localStorageService.getDevs();
  }

  handleDelete(i: number): void {
    this.devs.splice(i, 1);
    this.localStorageService.setDevs(this.devs);
    this.devs = this.localStorageService.getDevs();
    this.soundService.doAYeet();
  }

  handleEnableSound(event: MatCheckboxChange): void {
    this.soundService.enableSound = event.checked;
  }
}
