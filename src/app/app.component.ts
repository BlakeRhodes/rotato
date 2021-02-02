import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rotato-ui';
  spin = false;

  handleTheSpinningPotato(forThisLong: number): void {
    (async () => {
      this.spin = true;

      await this.delay(forThisLong * 1000);

      this.spin = false;
    })();
  }

  private delay(ms: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
