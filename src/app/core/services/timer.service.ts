import { Injectable } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TimerService {
	private timerSubscription?: Subscription;

	/**
	 * @function
	 * @returns void
	 * @name start
	 * @description Starts a new timer. Cancels the previous one if it exists.
	 * @param {number} duration - game duration
	 * @param {void} callback - callback function that used after timer stopped
	 */
	start(duration: number, callback: () => void): void {
		this.cancel();

		this.timerSubscription = timer(duration).subscribe(() => {
			callback();
		});
	}

	/**
	 * @function
	 * @returns void
	 * @name cancel
	 * @description Cancels the current timer.
	 */
	cancel(): void {
		this.timerSubscription?.unsubscribe();
		this.timerSubscription = undefined;
	}
}
