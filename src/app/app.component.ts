import {Component} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {delay} from './lulz';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  spin = false;

  handleTheSpinningPotato(): void {
    (async () => {
      this.spin = true;
      await delay(250);
      this.spin = false;
    })();
  }
}
