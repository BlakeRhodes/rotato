import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {shuffle} from '../lulz';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  @Output() taterSpinningTime: EventEmitter<any> = new EventEmitter<any>();
  pairs: string[][] = [];

  constructor(
    private localStorageService: LocalStorageService,
  ) {
    this.pairs = localStorageService.getPairs();
  }

  ngOnInit(): void {
  }

  handleClick(): void {
    this.taterSpinningTime.emit();
    this.pairs = [];
    let devs = this.localStorageService.getDevs();
    devs = shuffle(devs);
    if (devs.length % 2 !== 0) {
      devs.push(null);
    }
    for (let i = 0; i < devs.length / 2; i++) {
      const firstIndex = i * 2;
      const secondIndex = firstIndex + 1;
      const pair: string[] = [devs[firstIndex]];
      if (devs[secondIndex]) {
        pair.push(devs[secondIndex]);
      }
      this.pairs.push(pair);
    }
    this.localStorageService.setPairs(this.pairs);
  }

  handleDrop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.localStorageService.setPairs(this.pairs);
  }
}
