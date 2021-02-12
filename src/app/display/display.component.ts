import {Component, EventEmitter, Output} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {arraysAreEqual, shuffle} from '../lulz';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SoundService} from '../sound.service';
import {Pair} from '../pair';
import {RotationService} from '../rotation.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
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
    this.soundService.spinning()
    this.taterSpinningTime.emit();
    // const disabled = this.localStorageService.getDisabled();
    // let devs = this.localStorageService.getDevs()
    //   .filter(dev => !disabled.includes(dev));
    // this.makePairs(devs);
    this.pairs = this.rotationService.makeItRotato();
    this.localStorageService.setPairs(this.pairs);
  }

  handleDrop(event: CdkDragDrop<string[]>): void {
    this.soundService.dropPop();
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

  isSticking(pair: Pair){
    this.sticking.find(
      stickingPair => stickingPair.board === pair.board
        && arraysAreEqual(stickingPair.devs, pair.devs)
    );
  }

  private makePairs(devs: string[]): void {
    this.pairs = [];
    let boards = this.localStorageService.getBoards().filter(
      board => !this.localStorageService.getDisabledBoards().includes(board)
    );
    shuffle(boards);
    this.checkForToManyStoriesInflight(devs);
    devs = this.pairCarriers(devs, boards);
    DisplayComponent.evenTheNumberOfDevs(devs);
    this.pairRemainingDevs(devs, boards);
    this.localStorageService.setPairs(this.pairs);
  }

  private pairRemainingDevs(devs: string[], boards: string[]) {
    for (let i = 0; i < devs.length / 2; i++) {
      const firstIndex = i * 2;
      const secondIndex = firstIndex + 1;
      const pair: string[] = [devs[firstIndex]];
      const partner = devs[secondIndex];
      if (partner) {
        pair.push(partner);
      }
      this.pairs.push(
        {
          board: boards.pop(),
          devs: pair
        }
      );
    }
  }

  private static evenTheNumberOfDevs(devs: string[]) {
    if (devs.length % 2 !== 0) {
      devs.push(null);
    }
  }

  private pairCarriers(devs: string[], boards: string[]) {
    devs = shuffle(
      devs.filter(dev => !this.carriers.includes(dev))
    );
    for (const carrier of this.carriers) {
      const partner = devs.splice(0, 1)[0];
      if (partner) {
        this.pairs.push(
          {
            board: boards.pop(),
            devs:
              [carrier, partner]
          }
        );
      } else {
        this.pairs.push(
          {
            board: boards.pop(),
            devs:
              [carrier]
          }
        );
      }
    }
    return devs;
  }

  private checkForToManyStoriesInflight(devs: string[]) {
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
  }
}
