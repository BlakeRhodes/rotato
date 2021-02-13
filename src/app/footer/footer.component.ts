import { Component, OnInit } from '@angular/core';
import {ThemeService} from '../theme.service';
import {THEME_KEY} from '../constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  darkMode: boolean;
  constructor(
    private themeService: ThemeService,
  ) {
    this.darkMode = localStorage.getItem(THEME_KEY) === 'dark';
  }

  ngOnInit(): void {
  }

  getBackground(): string {
    return this.themeService.getBackground(1);
  }

  handleClick() {
    localStorage.setItem(THEME_KEY, this.darkMode? 'classic':'dark');
    this.darkMode = !this.darkMode;
  }

  handleDoubleClick() {

  }
}
