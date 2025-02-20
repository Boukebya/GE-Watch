export class SharedTimeService {
    private seconds: number = new Date().getSeconds();
    private listeners: (() => void)[] = [];

    constructor() {
        setInterval(() => {
            this.updateTime();
            this.notifyListeners();
        }, 1000);
    }

    /**
     * Update seconds by one
    */
    private updateTime(): void {
        this.seconds = (this.seconds + 1) % 60;
    }

    /**
     * Notify all subscribed listeners
    */
    private notifyListeners(): void {
        this.listeners.forEach(listener => listener());
    }

    /**
     * Subscribe a listener to the shared time service
    */
    subscribe(listener: () => void): void {
        this.listeners.push(listener);
    }

    /**
     * Get the seconds value from the shared time service
    */
    getSeconds(): number {
        return this.seconds;
    }
}

export const sharedTimeService = new SharedTimeService();