import {Component, Input, OnInit} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {SoundService} from '../services/sound.service';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {DELETE_BUTTON_TEXT} from '../utillity/constants';
import {ThemeService} from '../services/theme.service';

@Component({
  selector: 'app-dev-controls',
  templateUrl: './dev-controls.component.html',
  styleUrls: ['./dev-controls.component.scss']
})
export class DevControlsComponent implements OnInit {
  @Input()
  isMobile = false;

  devs: string[];
  disabled: string[] = [];
  DevPlaceHolder = 'Dev D. Developer';
  inputLabel = 'Devs Name';
  deleteButtonText = DELETE_BUTTON_TEXT;

  constructor(
    private localStorageService: LocalStorageService,
    private soundService: SoundService,
    private themeService: ThemeService,
  ) {
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

  getCurrentClass(board: string) {
    return this.isDisabled(board)? this.themeService.getSelected():this.themeService.getBackground(5);
  }

  getColor(): string {
    return this.themeService.getLabel();
  }

  getInputColor(): string {
    return this.themeService.getInput();
  }

  getFormColor(): string {
    return this.themeService.getFormColor();
  }
}
