import {NgModule} from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PotatoComponent} from './potato/potato.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {DevControlsComponent} from './dev-controls/dev-controls.component';
import {DisplayComponent} from './display/display.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BoardsComponent} from './boards/boards.component';
import {FooterComponent} from './footer/footer.component';
import {MatMenuModule} from '@angular/material/menu';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {MobilePotatoComponent} from './mobile-potato/mobile-potato.component';
import {MobileSelectorComponent} from './mobile-selector/mobile-selector.component';

import {MenuComponent} from './menu/menu.component';
import {MatTabsModule} from '@angular/material/tabs';
import {HammerConfiguration} from './configs/hammer-configuration';
import {dbConfig} from './configs/db-config';
import {NgxIndexedDBModule} from 'ngx-indexed-db';
import { SaveDialogComponent } from './save-dialog/save-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { SharedComponent } from './shared/shared.component';
import {RouterModule} from '@angular/router';
import {routes} from './configs/routes';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    PotatoComponent,
    DevControlsComponent,
    DisplayComponent,
    BoardsComponent,
    FooterComponent,
    MobilePotatoComponent,
    MobileSelectorComponent,
    MenuComponent,
    SaveDialogComponent,
    SharedComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClipboardModule,
    DragDropModule,
    HammerModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production, registrationStrategy: 'registerImmediately'}),
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [{provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfiguration}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
