import { Component, inject } from '@angular/core';
import { GameService } from '../../core/services/game.service';

@Component({
	selector: 'app-scoreboard',
	standalone: true,
	templateUrl: './scoreboard.component.html',
	styleUrl: './scoreboard.component.scss',
})
export class ScoreboardComponent {
	protected readonly gameService = inject(GameService);
}
