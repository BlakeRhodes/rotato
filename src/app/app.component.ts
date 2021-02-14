import {Component} from '@angular/core';
import {delay} from './lulz';
import {ThemeService} from './theme.service';
import {MediaQueryService} from './media-query.service';
import {ScreenType} from './enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  spin = false;
  screenType: ScreenType;
  constructor(
    private themeService: ThemeService,
    private mediaQueryService: MediaQueryService,
  ) {
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

  isDesktop() {
    return this.screenType === ScreenType.Desktop;
  }
}
