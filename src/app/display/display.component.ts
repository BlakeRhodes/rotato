import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {shuffle} from '../lulz';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SoundService} from '../sound.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  @Output() taterSpinningTime: EventEmitter<any> = new EventEmitter<any>();
  pairs: string[][] = [];
  carriers: string[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private soundService: SoundService,
    private snackBar: MatSnackBar,
  ) {
    this.pairs = localStorageService.getPairs();
    this.carriers = localStorageService.getCarriers();
  }

  ngOnInit(): void {
  }

  handleClick(): void {
    this.taterSpinningTime.emit();
    this.pairs = [];
    let devs = this.localStorageService.getDevs();
    const disabled = this.localStorageService.getDisabled();
    devs = devs.filter(dev => !disabled.includes(dev));
    this.makePairs(devs);
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
    this.localStorageService.setPairs(this.pairs.filter(pair => pair.length > 0));
  }

  private makePairs(devs: string[]): void {
    this.pairs = [];

    if (this.carriers.length * 2 > devs.length + 1) {
      this.soundService.heyListen();
      this.snackBar.open(
        'Hey Pal, that is too many stories in flight',
        'SORRY',
        {
          duration: 4000
        }
      );
    }
    devs = devs.filter(dev => this.carriers.indexOf(dev) === -1);
    devs = shuffle(devs);
    for (const carrier of this.carriers) {
      const partner = devs.splice(0, 1)[0];
      if (partner) {
        this.pairs.push([carrier, partner]);
      } else {
        this.pairs.push([carrier]);
      }
    }
    if (devs.length % 2 !== 0) {
      devs.push(null);
    }
    for (let i = 0; i < devs.length / 2; i++) {
      const firstIndex = i * 2;
      const secondIndex = firstIndex + 1;
      const pair: string[] = [devs[firstIndex]];
      const partner = devs[secondIndex];
      console.log('About to check partner', partner);
      if (partner) {
        pair.push(partner);
        console.log('just pushed', partner);
      }
      this.pairs.push(pair);
    }
  }

  handleMarkAsCarry(dev: string): void {
    const found = this.carriers.findIndex(name => name === dev);
    if (found === -1) {
      this.carriers.push(dev);
    } else {
      this.carriers.splice(found, 1);
    }
    this.localStorageService.setCarriers(this.carriers);
  }

  isCarrying(dev: string): string {
    return this.carriers.find(name => name === dev);
  }
}
