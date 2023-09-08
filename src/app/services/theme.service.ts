import {Injectable} from '@angular/core';
import {THEME_KEY} from '../utillity/constants';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private potatoPathSubject = new Subject<string>();
  potatoPath$ = this.potatoPathSubject.asObservable();

  private mobilePotatoPathSubject = new Subject<string>();
  mobilePotatoPath$ = this.mobilePotatoPathSubject.asObservable();

  constructor() {
    this.setPotatoPath(this.getTheme());
  }

  setPotatoPath(theme: string): void {
    if (theme === 'orange') {
      this.potatoPathSubject.next('assets/sweet-potato.webp');
      this.mobilePotatoPathSubject.next('assets/sweet-potato.webp');
    }
    else {
      this.potatoPathSubject.next('assets/potato.webp');
      this.mobilePotatoPathSubject.next('assets/potato.webp');
    }
  }

  setTheme(theme: string): void {
    localStorage.setItem(THEME_KEY, theme);
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
