import {Routes} from '@angular/router';
import {SharedComponent} from '../shared/shared.component';
import {AppComponent} from '../app.component';
import {MainComponent} from '../main/main.component';

export const routes: Routes = [
  { path: 'shared', component: SharedComponent },
  { path: '**', component: MainComponent }
];
