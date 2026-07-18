import { Component } from '@angular/core';
import { ControlsComponent } from './components/controls/controls.component';
import {
	ScoreboardComponent
} from './components/scoreboard/scoreboard.component';
import { BoardComponent } from './components/board/board.component';
import {
	ResultModalComponent
} from './components/result-modal/result-modal.component';

@Component({
  selector: 'app-root',
	imports: [
		ControlsComponent, ScoreboardComponent,
		BoardComponent, ResultModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
