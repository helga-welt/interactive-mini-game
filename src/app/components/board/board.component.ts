import { Component, inject } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { GameService } from '../../core/services/game.service';

@Component({
	selector: 'app-board',
	standalone: true,
	imports: [CellComponent],
	templateUrl: './board.component.html',
	styleUrl: './board.component.scss',
})
export class BoardComponent {
	protected readonly gameService = inject(GameService);
}
