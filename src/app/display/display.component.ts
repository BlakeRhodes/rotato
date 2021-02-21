import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {arraysAreEqual} from '../utillity/lulz';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {SoundService} from '../services/sound.service';
import {Pair} from '../utillity/pair';
import {RotationService} from '../services/rotation.service';
import {ThemeService} from '../services/theme.service';
import {DOUBLE_CLICK_MESSAGE} from '../utillity/constants';
import {NgxCaptureService} from 'ngx-capture';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ScreenshotComponent} from '../screenshot/screenshot.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {
  @ViewChild('screen', {static: true}) screen: any;
  @Output() taterSpinningTime: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  isMobile = false;

  pairs: Pair[] = [];
  sticking: Pair[];
  carriers: string[] = [];
  boards: string[] = [];
  displayTitleText = 'Spuddies';
  toolTip = 'SPIN THE POTATO! MAKE IT ROTATO!';
  doubleClickMessage = DOUBLE_CLICK_MESSAGE;

  constructor(
    private localStorageService: LocalStorageService,
    private soundService: SoundService,
    private rotationService: RotationService,
    private themeService: ThemeService,
    private captureService: NgxCaptureService,
    private dialog: MatDialog,
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

  handleSticking(pair: Pair): void {
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
    if (found) {
      return this.themeService.getSelected();
    }
    return this.themeService.getPairCard();
  }

  handleExit(pair: Pair): void {
    const found = this.sticking.find(
      stickingPair => arraysAreEqual(stickingPair.devs, pair.devs)
    );
    if (found) {
      this.handleSticking(pair);
    }
  }

  getColor(dev: string): string {
    return this.isCarrying(dev) ? this.themeService.getSelected() : this.themeService.devCard();
  }

  isTurnedIn(pair: Pair): Pair {
    return this.sticking.find(
      stickingPair => arraysAreEqual(stickingPair.devs, pair.devs)
    );
  }

  screenShot(): void {
    this.captureService.getImage(this.screen.nativeElement, true)
      .subscribe(image => {
        this.openDialog(image);
      });
  }

  getStyle(): string {
    return this.themeService.getSpuddies()
  }

  private openDialog(img: string): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { image: img};

    this.dialog.open(ScreenshotComponent, dialogConfig);
  }
}
