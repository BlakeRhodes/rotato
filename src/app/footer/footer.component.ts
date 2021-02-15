import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../theme.service';
import {THEME_KEY} from '../constants';
import {Theme} from '../theme';

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
  constructor(
    private themeService: ThemeService,
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
}
