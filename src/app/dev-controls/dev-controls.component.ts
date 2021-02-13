import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {SoundService} from '../sound.service';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {DELETE_BUTTON_TEXT} from '../constants';

@Component({
  selector: 'app-dev-controls',
  templateUrl: './dev-controls.component.html',
  styleUrls: ['./dev-controls.component.scss']
})
export class DevControlsComponent implements OnInit {
  devs: string[];
  disabled: string[] = [];
  enableSound: boolean;
  DevPlaceHolder = 'Dev D. Developer';
  inputLabel = 'Devs Name';
  enableSoundText = 'Enable Sound';
  deleteButtonText = DELETE_BUTTON_TEXT;

  constructor(
    private localStorageService: LocalStorageService,
    private soundService: SoundService,
  ) {
    this.enableSound = this.localStorageService.getEnableSound();
  }

  ngOnInit(): void {
    this.devs = this.localStorageService.getDevs();
    this.disabled = this.localStorageService.getDisabled();
  }

  handleAdd(value: string): void {
    if (value !== '') {
      this.localStorageService.addDev(value);
      this.soundService.dropPop();
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
    this.localStorageService.setSoundEnabled(event.checked);
    this.soundService.enableSound = event.checked;
  }

  handleDisable(i: number, dev: string): void {
    const found = this.disabled.findIndex(name => name === dev);
    if (found === -1) {
      this.disabled.push(dev);
    } else {
      this.disabled.splice(found, 1);
    }
    this.localStorageService.setDisabled(this.disabled);
  }

  isDisabled(dev: string): boolean {
    return !!this.disabled.find(name => name === dev);
  }
}
