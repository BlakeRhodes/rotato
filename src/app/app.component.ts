import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rotato-ui';
  spin = false;

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
}
