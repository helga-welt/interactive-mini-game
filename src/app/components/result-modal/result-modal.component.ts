import { Component, inject, signal } from '@angular/core';
import { GameService } from '../../core/services/game.service';

@Component({
	selector: 'app-result-modal',
	standalone: true,
	templateUrl: './result-modal.component.html',
	styleUrl: './result-modal.component.scss',
})
export class ResultModalComponent {
	protected readonly gameService = inject(GameService);
}
