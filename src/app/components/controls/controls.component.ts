import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../core/services/game.service';

@Component({
	selector: 'app-controls',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './controls.component.html',
	styleUrl: './controls.component.scss',
})
export class ControlsComponent {
	protected readonly gameService = inject(GameService);

	readonly timeout = model(1000);

	/**
	 * @function
	 * @returns void
	 * @name startGame
	 * @description Starts a new game using the selected timeout.
	 */
	startGame(): void {
		this.gameService.startGame(this.timeout());
	}
}
