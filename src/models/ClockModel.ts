import { formatTime } from "../utils/formatDate";

export class ClockModel {
    private hours: number;
    private minutes: number;
    private seconds: number;
    private manualUpdate: boolean = false;
    private manualUpdateTimeout: any;

    constructor(gmt : number = 0) {
        const now = new Date();
        const hours = now.getHours() + gmt;
        this.hours = hours;
        this.minutes = now.getMinutes();
        this.seconds = now.getSeconds();
    }

    /**
     * Get the current time in 'hh:mm:ss' format.
     * 
     * @returns {string} - The formatted time string.
     */
    getTime(): string {
        return `${formatTime(this.hours)}:${formatTime(this.minutes)}:${formatTime(this.seconds)}`;
    }


    /**
     * Increment the hours by one, wrapping around to 0 after 23.
     */
    increaseHours(): void {
        this.hours = (this.hours + 1) % 24;
        this.setManualUpdate();
    }

    /**
     * Increment the minutes by one, wrapping around to 0 after 59.
     * If minutes roll over, it will increment the hours.
     */
    increaseMinutes(): void {
        this.minutes = (this.minutes + 1) % 60;
        if (this.minutes === 0) {
            this.increaseHours();
        }
        this.setManualUpdate();
    }

    /**
     * Marks the clock as manually updated and resets the manual update flag
     * after a short delay (1 second).
     */
    private setManualUpdate() {
        this.manualUpdate = true;
        clearTimeout(this.manualUpdateTimeout);
        this.manualUpdateTimeout = setTimeout(() => {
            this.manualUpdate = false;
        }, 1); // Allow the update flag to reset after 1 millisecond
    }

    /**
     * Directly updates the time once (instead of using setInterval).
     * This method should be called every second manually from outside.
     */
    updateTime(): void {
        if (!this.manualUpdate) {
            this.seconds = (this.seconds + 1) % 60;

            if (this.seconds === 0) {
                // If seconds reach 00, increment minutes
                this.increaseMinutes();
            }
        }
    }
}
