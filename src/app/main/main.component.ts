import { Component, OnInit } from '@angular/core';
import {ScreenType} from '../utillity/enums';
import {ThemeService} from '../services/theme.service';
import {MediaQueryService} from '../services/media-query.service';
import {DecodeService} from '../services/decode.service';
import {delay} from '../utillity/lulz';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  spin = false;
  screenType: ScreenType;

  constructor(
    private themeService: ThemeService,
    private mediaQueryService: MediaQueryService,
    private decodeService: DecodeService,
  ) {
  }

  ngOnInit(): void {
    this.mediaQueryService.screenType.subscribe(screenType => this.screenType = screenType);
  }

  handleTheSpinningPotato(): void {
    (async () => {
      this.spin = true;
      await delay(500);
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
