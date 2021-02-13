import {Component} from '@angular/core';
import {delay} from './lulz';
import {ThemeService} from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  spin = false;
  constructor(
    private themeService: ThemeService,
  ) {
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
}
