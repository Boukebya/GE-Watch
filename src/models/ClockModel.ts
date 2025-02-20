import { formatTime } from "../utils/formatDate";

export class ClockModel {
    private hours: number;
    private minutes: number;
    private seconds: number;

    constructor(gmt: number = 0) {
        const now = new Date();
        let hours = now.getHours() + gmt;

        // Handle cases where GMT offset makes hours negative or greater than 23
        if (hours < 0) {
            hours = 24 + hours;
        }
        if (hours > 23) {
            hours = hours % 24;
        }

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
    }

    /**
     * Directly updates the time once (instead of using setInterval).
     * This method should be called every second manually from outside.
     */
    updateTime(): void {
        this.seconds = (this.seconds + 1) % 60;
        if (this.seconds === 0) {
            this.increaseMinutes();
        }
    }
}