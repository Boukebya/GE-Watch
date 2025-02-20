import { formatTime } from "../utils/formatDate";
import { sharedTimeService } from '../services/sharedTimeService';

export class ClockModel {
    private hours: number;
    private minutes: number;
    private gmt: number;
    // listeners
    private listeners: (() => void)[] = [];

    constructor(gmt: number = 0) {
        this.gmt = gmt;
        this.minutes = new Date().getMinutes();
        this.hours = this.calculateInitialHours();
        sharedTimeService.subscribe(() => {
            this.updateTime();
            this.notifyListeners();
        });
    }

    /**
     * Initialize the hours based on the GMT offset on clock creation
     * 
     * @returns {number} Hours based on GMT offset.
    */
    private calculateInitialHours(): number {
        let hours = new Date().getHours() + this.gmt;
        // Handle cases where GMT offset makes hours negative or greater than 23
        if (hours < 0) {
            hours = 24 + hours;
        }
        if (hours > 23) {
            hours = hours % 24;
        }
        return hours;
    }

    /**
     * Get the current time in 'hh:mm:ss' format.
     * 
     * @returns {string} - The formatted time string.
    */
    getTime(): string {
        return `${formatTime(this.hours)}:${formatTime(this.minutes)}:${formatTime(sharedTimeService.getSeconds())}`;
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
            this.hours = (this.hours + 1) % 24;
        }
    }

    /**
     * Subscribe a function to be called whenever the time changes.
    */
    subscribe(listener: () => void): void {
        this.listeners.push(listener);
    }

    /**
     * Send a notification to all subscribed functions.
    */
    private notifyListeners(): void {
        this.listeners.forEach(listener => listener());

    }

    /**
     * Update the time using the seconds from sharedTimeService and update the model accordingly.
    */
    private updateTime(): void {
        const seconds = sharedTimeService.getSeconds();
        if (seconds === 0) {
            this.minutes = (this.minutes + 1) % 60;
            if (this.minutes === 0) {
                this.hours = (this.hours + 1) % 24;
            }
        }
    }
}