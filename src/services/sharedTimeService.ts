export class SharedTimeService {
    private seconds: number = new Date().getSeconds();
    private listeners: (() => void)[] = [];

    constructor() {
        setInterval(() => {
            this.updateTime();
            this.notifyListeners();
        }, 1000);
    }

    private updateTime(): void {
        this.seconds = (this.seconds + 1) % 60;
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => listener());
    }

    subscribe(listener: () => void): void {
        this.listeners.push(listener);
    }

    getSeconds(): number {
        return this.seconds;
    }
}

export const sharedTimeService = new SharedTimeService();