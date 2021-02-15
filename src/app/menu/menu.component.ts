import {Component, Input, OnInit} from '@angular/core';
import {Theme} from '../utillity/theme';
import {ThemeService} from '../services/theme.service';
import {LocalStorageService} from '../services/local-storage.service';
import {SoundService} from '../services/sound.service';
import {THEME_KEY} from '../utillity/constants';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input()
  isMobile = false;
  themes: Theme[] = [
    { sheet: 'light', name: 'Mashed'},
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
    this.enableSound = this.soundService.soundEnabled;
  }

  getBackground(): string {
    return this.themeService.getBackground(1);
  }

  setTheme(theme: string): void {
    localStorage.setItem(THEME_KEY, theme);
  }

  handleEnableSound(event: MatCheckboxChange): void {
    this.localStorageService.setSoundEnabled(event.checked);
    this.soundService.soundEnabled = event.checked;
  }

  isSelected(sheet: string): boolean {
    return sheet === this.themeService.getTheme();
  }
}
