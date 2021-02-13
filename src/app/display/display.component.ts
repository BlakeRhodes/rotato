import {Component, EventEmitter, Output} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {arraysAreEqual} from '../lulz';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SoundService} from '../sound.service';
import {Pair} from '../pair';
import {RotationService} from '../rotation.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {
  @Output() taterSpinningTime: EventEmitter<any> = new EventEmitter<any>();

  pairs: Pair[] = [];
  sticking: Pair[];
  carriers: string[] = [];
  boards: string[] = [];
  displayTitleText = 'Spuddies';
  toolTip = 'SPIN THE POTATO! MAKE IT ROTATO!';

  constructor(
    private localStorageService: LocalStorageService,
    private soundService: SoundService,
    private snackBar: MatSnackBar,
    private rotationService: RotationService,
  ) {
    this.pairs = localStorageService.getPairs();
    this.carriers = localStorageService.getCarriers();
    this.boards = localStorageService.getBoards();
    this.sticking = localStorageService.getSticking();
  }

  handleClick(): void {
    this.soundService.spinning();
    this.taterSpinningTime.emit();
    this.pairs = this.rotationService.makeItRotato();
    this.localStorageService.setPairs(this.pairs);
  }

  handleDrop(event: CdkDragDrop<string[]>, pair: Pair): void {
    this.soundService.dropPop();
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.handleExit(pair);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.localStorageService.setPairs(this.pairs);
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

  handleSticking(pair: Pair) {
    const found = this.sticking.findIndex(
      stickingPair => arraysAreEqual(stickingPair.devs, pair.devs)
    );
    if (found === -1) {
      this.sticking.push(pair);
    } else {
      this.sticking.splice(found, 1);
    }
    this.localStorageService.setSticking(this.sticking);
  }

  isSticking(pair: Pair): Pair {
    return this.sticking.find(
      stickingPair => arraysAreEqual(stickingPair.devs, pair.devs)
    );
  }

  handleExit(pair: Pair) {
    if(this.isSticking(pair)){
      this.handleSticking(pair);
    }
  }
}
