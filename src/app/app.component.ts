import {Component, OnInit} from '@angular/core';
import {delay} from './utillity/lulz';
import {ThemeService} from './services/theme.service';
import {MediaQueryService} from './services/media-query.service';
import {ScreenType} from './utillity/enums';
import {LocalStorageService} from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  spin = false;
  screenType: ScreenType;

  constructor(
    private themeService: ThemeService,
    private mediaQueryService: MediaQueryService,
  ) {
  }

  ngOnInit(): void {
    this.mediaQueryService.screenType.subscribe(screenType => this.screenType = screenType);
  }

  handleTheSpinningPotato(): void {
    (async () => {
      this.spin = true;
      await delay(250);
      this.spin = false;
    })();
  }

  getBackground(): string {
    return this.themeService.getBackground(1);
  }

  isDesktop(): boolean {
    return this.screenType === ScreenType.Desktop;
  }
}
