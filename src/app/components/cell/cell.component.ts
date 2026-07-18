import { Component, computed, input, output } from '@angular/core';
import { Cell } from '../../shared/models/cell.model';

@Component({
	selector: 'app-cell',
	standalone: true,
	templateUrl: './cell.component.html',
	styleUrl: './cell.component.scss',
})
export class CellComponent {
	readonly cell = input.required<Cell>();
	readonly cssClass = computed(() => this.cell().state);
	readonly cellClick = output<number>();

	/**
	 * @function
	 * @returns void
	 * @name onClick
	 * @description Emits the id of the clicked cell.
	 */
	onClick(): void {
		this.cellClick.emit(this.cell().id);
	}
}
