import {Component} from '@angular/core';
import {LocalStorageService} from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rotato-ui';
  spin = false;

  constructor(private localStorageService: LocalStorageService) {
  }

  handleTheSpinningPotato(): void {
    (async () => {
      this.spin = true;
      await this.delay(1000);
      this.spin = false;
    })();
  }

  private delay(ms: number): Promise<unknown> {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }

  fuckItUp() {
    this.localStorageService.set('pairs',[['Blake','roger'],['Father Simon','Kitty']])
  }
}
