import { Component, OnInit } from '@angular/core';
import {ThemeService} from '../theme.service';
import {THEME_KEY} from '../constants';
import {Theme} from '../theme';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {LocalStorageService} from '../local-storage.service';
import {SoundService} from '../sound.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  themes: Theme[] = [
    { sheet:'light', name: 'Mashed'},
    { sheet: 'classic', name: 'Fried'},
    { sheet: 'dark', name: 'Baked'},
    { sheet: 'black', name: 'Burnt'},
  ];
  enableSound: boolean;
  enableSoundText = 'Enable Sound';
  constructor(
    private themeService: ThemeService,
    private localStorageService: LocalStorageService,
    private soundService: SoundService,
  ) {
  }

  ngOnInit(): void {
  }

  getBackground(): string {
    return this.themeService.getBackground(1);
  }

  setTheme(theme: string) {
    localStorage.setItem(THEME_KEY, theme);
  }

  handleEnableSound(event: MatCheckboxChange): void {
    this.localStorageService.setSoundEnabled(event.checked);
    this.soundService.enableSound = event.checked;
  }
}
