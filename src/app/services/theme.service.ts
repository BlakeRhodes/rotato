import {Injectable} from '@angular/core';
import {THEME_KEY} from '../utillity/constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
  }

  getTheme(): string {
    return localStorage.getItem(THEME_KEY);
  }

  getSelected(): string{
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-selected`;
  }

  getListItem(): string{
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-list-item`;
  }

  getInputColor(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-input`;
  }

  getTab(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-tab`;
  }

  getSharedPage(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-shared-page`;
  }

  getHeader(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-header`;
  }

  getSpuddies(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-spuddies`;
  }

  getPairCard(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-pair-card`;
  }

  devCard(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-dev-card`;
  }

  getBackground(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-background`;
  }
}
