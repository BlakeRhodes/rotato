import {Component, Input, OnInit} from '@angular/core';
import {Theme} from '../utillity/theme';
import {ThemeService} from '../services/theme.service';
import {LocalStorageService} from '../services/local-storage.service';
import {SoundService} from '../services/sound.service';
import {HOST, THEME_KEY} from '../utillity/constants';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {SaveDialogComponent} from '../save-dialog/save-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DecodeService} from '../services/decode.service';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input()
  isMobile = false;
  themes: Theme[] = [
    {sheet: 'light', name: 'Mashed'},
    {sheet: 'classic', name: 'Fried'},
    {sheet: 'dark', name: 'Baked'},
    {sheet: 'black', name: 'Burnt'},
  ];
  enableSound: boolean;
  enableSoundText = 'Enable Sound';
  teamBoards: string [] = [];
  sharedLink = 'shared/?board=';
  private boardName: string;

  constructor(
    private themeService: ThemeService,
    private localStorageService: LocalStorageService,
    private decodeService: DecodeService,
    private soundService: SoundService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private clipboard: Clipboard,
  ) {
  }

  ngOnInit(): void {
    this.enableSound = this.soundService.soundEnabled;
    this.localStorageService.getTeamBoards()
      .subscribe(boards => this.teamBoards = boards);
  }

  getBackground(): string {
    return this.themeService.getBackground(1);
  }

  setTheme(theme: string): void {
    localStorage.setItem(THEME_KEY, theme);
  }

  handleEnableSound(event: MatCheckboxChange): void {
    this.localStorageService.setSoundEnabled(event.checked);
    this.soundService.soundEnabled = event.checked;
  }

  isSelected(sheet: string): boolean {
    return sheet === this.themeService.getTheme();
  }

  loadBoard(board: string): void {
    this.localStorageService.loadState(board)
      .add(() => location.reload());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SaveDialogComponent, {
      width: '250px',
      data: this.boardName
    });

    dialogRef.afterClosed().subscribe(result => {
      this.boardName = result;
      this.localStorageService.saveState(this.boardName)
        .add(() => this.localStorageService.getTeamBoards()
          .subscribe(
            next => {
                this.teamBoards = next;
                this.openSnackBar(`${this.boardName} was saved.`, '🥔🥔🥔🥔');
                this.soundService.heyListen();
            }
          )
        );
    });
  }

  deleteBoard(board: string): void {
    this.localStorageService.deleteState(board)
      .add(
        () => this.localStorageService.getTeamBoards()
          .subscribe(next => this.teamBoards = next)
      );
    this.openSnackBar(`${board} has been deleted.`, 'Good');
    this.soundService.heyListen();
  }
  private openSnackBar(message: string, action: string): void {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }

  handleShare() {
    const link = `${HOST}${this.sharedLink}${this.decodeService.encode()}`;
    this.snackbar.open('Copied to the Clipboard', '🥔🥔🥔🥔');
    this.clipboard.copy(link);
  }
}
