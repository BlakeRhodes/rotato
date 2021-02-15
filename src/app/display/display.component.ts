import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {arraysAreEqual} from '../utillity/lulz';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SoundService} from '../services/sound.service';
import {Pair} from '../utillity/pair';
import {RotationService} from '../services/rotation.service';
import {ThemeService} from '../services/theme.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {
  @Output() taterSpinningTime: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  isMobile = false;

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
    private themeService: ThemeService,
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

  isSticking(pair: Pair): string {
    const found = this.sticking.find(
      stickingPair => arraysAreEqual(stickingPair.devs, pair.devs)
    );
    if(found){
      return this.themeService.getSelected();
    }
    return this.themeService.getBackground(2);
  }

  handleExit(pair: Pair) {
    const found = this.sticking.find(
      stickingPair => arraysAreEqual(stickingPair.devs, pair.devs)
    );
    if(found){
      this.handleSticking(pair);
    }
  }

  getColor(dev: string) {
    return this.isCarrying(dev) ? this.themeService.getSelected() : this.themeService.getBackground(5);
  }

  getLabelColor() {
    return this.themeService.getColor(1);
  }

  isTurnedIn(pair: Pair) {
    return this.sticking.find(
      stickingPair => arraysAreEqual(stickingPair.devs, pair.devs)
    );
  }

  getBackground() {
    return this.themeService.getBackground(4);
  }
}
