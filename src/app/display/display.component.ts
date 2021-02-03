import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {shuffle} from '../lulz';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  @Output() taterSpinningTime: EventEmitter<number> = new EventEmitter<number>();
  pairs: string[] = [];

  constructor(
    private localStorageService: LocalStorageService,
  ) {
    this.pairs = localStorageService.getPairs();
  }

  ngOnInit(): void {
  }

  handleClick(): void {
    this.taterSpinningTime.emit(2);
    this.pairs = [];
    let devs = this.localStorageService.getDevs();
    devs = shuffle(devs);
    if (devs.length % 2 !== 0) {
      devs.push(null);
    }
    for (let i = 0; i < devs.length / 2; i++) {
      const firstIndex = i * 2;
      const secondIndex = firstIndex + 1;
      let pair = devs[firstIndex];
      if (devs[secondIndex]) {
        pair += ` and ${devs[secondIndex]}`;
      }
      this.pairs.push(pair);
    }
    this.localStorageService.setPairs(this.pairs);
  }
}
