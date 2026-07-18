import { Injectable, computed, signal, inject } from '@angular/core';
import { Cell } from '../../shared/models/cell.model';
import { TimerService } from './timer.service';
import { TOTAL_CELLS, WIN_SCORE } from '../config/app.constants';

@Injectable({
	providedIn: 'root',
})
export class GameService {
	protected readonly timerService = inject(TimerService);

	readonly board = signal<Cell[]>([]);
	readonly playerScore = signal(0);
	readonly computerScore = signal(0);
	readonly isRunning = signal(false);
	readonly winner = signal<'Player' | 'Computer' | null>(null);
	readonly timeout = signal(1000);

	constructor() {
		this.createBoard();
	}

	/**
	 * @function
	 * @returns void
	 * @name startGame
	 * @description Initializes a new game, resets the board and scores, and starts the first round.
	 * @param {number} timeout - Time in milliseconds allowed for the player to click the active cell.
	 */
	startGame(timeout: number): void {
		this.timerService.cancel();

		this.timeout.set(timeout);

		this.playerScore.set(0);
		this.computerScore.set(0);

		this.winner.set(null);

		this.isRunning.set(true);

		this.createBoard();

		this.nextRound();
	}

	/**
	 * @function
	 * @returns void
	 * @name closeResult
	 * @description Closes the result modal and resets the game state.
	 */
	closeResult(): void {
		this.winner.set(null);
		this.playerScore.set(0);
		this.computerScore.set(0);
		this.createBoard();
		this.isRunning.set(false);

		this.timerService.cancel();
	}

	/**
	 * @function
	 * @returns void
	 * @name restart
	 * @description Restarts the game using the previously selected timeout value.
	 */
	restart(): void {
		this.startGame(this.timeout());
	}

	/**
	 * @function
	 * @returns void
	 * @name playerClick
	 * @description Handles player's click on a cell. If the clicked cell is active, awards a point to the player and starts the next round.
	 * @param {number} id - Identifier of the clicked cell.
	 */
	playerClick(id: number): void {
		if (!this.isRunning()) {
			return;
		}

		const board = [...this.board()];

		const cell = board.find((c) => c.id === id);

		if (!cell || cell.state !== 'active') {
			return;
		}

		this.timerService.cancel();

		cell.state = 'player';

		this.board.set(board);

		this.playerScore.update((score) => score + 1);

		if (!this.checkWinner()) {
			this.nextRound();
		}
	}

	/**
	 * @function
	 * @returns void
	 * @name nextRound
	 * @description Selects a random available cell, marks it as active, and starts the countdown timer.
	 * @private
	 */
	private nextRound(): void {

		if (!this.isRunning()) {
			return;
		}

		const board = this.board().map(cell => ({ ...cell }));

		const available = board.filter((cell) => cell.state === 'idle');

		if (!available.length) {
			this.finish();
			return;
		}

		const randomCell =
			available[Math.floor(Math.random() * available.length)];

		randomCell.state = 'active';

		this.board.set(board);

		this.timerService.start(this.timeout(), () => {
			this.computerMove(randomCell.id);
		});
	}

	/**
	 * @function
	 * @returns void
	 * @name computerMove
	 * @description Handles the computer's move when the player fails to click the active cell within the specified timeout.
	 * @param {number} id - Identifier of the active cell.
	 * @private
	 */
	private computerMove(id: number): void {
		if (!this.isRunning()) {
			return;
		}

		const board = [...this.board()];

		const cell = board.find((c) => c.id === id);

		if (!cell || cell.state !== 'active') {
			return;
		}

		cell.state = 'computer';

		this.board.set(board);

		this.computerScore.update((score) => score + 1);

		if (!this.checkWinner()) {
			this.nextRound();
		}
	}

	/**
	 * @function
	 * @returns boolean
	 * @name checkWinner
	 * @description Checks whether either the player or the computer has reached the winning score.
	 * @returns {boolean} Returns true if the game has ended; otherwise, false.
	 * @private
	 */
	private checkWinner(): boolean {
		if (this.playerScore() >= WIN_SCORE) {
			this.finish('Player');
			return true;
		}

		if (this.computerScore() >= WIN_SCORE) {
			this.finish('Computer');
			return true;
		}

		return false;
	}

	/**
	 * @function
	 * @returns void
	 * @name finish
	 * @description Stops the current game, cancels the active timer, and stores the final game result.
	 * @param {'Player' | 'Computer'} [winner] - Winner of the game.
	 * @private
	 */
	private finish(winner?: 'Player' | 'Computer'): void {
		this.timerService.cancel();

		this.isRunning.set(false);

		if (winner) {
			this.winner.set(winner);
		}
	}

	/**
	 * @function
	 * @returns void
	 * @name createBoard
	 * @description Creates a new 10x10 game board where every cell is initialized with the idle state.
	 * @private
	 */
	private createBoard(): void {
		const board: Cell[] = Array.from(
			{ length: TOTAL_CELLS },
			(_, index): Cell => ({
				id: index,
				state: 'idle',
			})
		);

		this.board.set(board);
	}
}
