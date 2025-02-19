import { Display } from '../display/Display';

export class ClockView {
    private clockContainer: HTMLElement;
    private modeButton: HTMLElement;
    private increaseButton: HTMLElement;
    private lightButton: HTMLElement;
    private switchFormatButton: HTMLElement;
    private display: Display;

    constructor(clockContainer: HTMLElement, modeButton: HTMLElement, increaseButton: HTMLElement, lightButton: HTMLElement, switchFormatButton: HTMLElement) {
        this.clockContainer = clockContainer;
        this.modeButton = modeButton;
        this.increaseButton = increaseButton;
        this.lightButton = lightButton;
        this.switchFormatButton = switchFormatButton;

        this.display = new Display(clockContainer);
    }

    updateTime(time: string): void {
        this.display.updateTime(time); // Delegate to Display instance
    }

    bindModeButton(callback: () => void): void {
        this.modeButton.addEventListener('click', callback);
    }

    bindIncreaseButton(callback: () => void): void {
        this.increaseButton.addEventListener('click', callback);
    }

    bindLightButton(callback: () => void): void {
        this.lightButton.addEventListener('click', callback);
    }

    bindSwitchFormatButton(callback: () => void): void {
        this.switchFormatButton.addEventListener('click', callback);
    }

    blinkElement(isBlinking: boolean, editMode: number): void {
        this.display.blinkElement(isBlinking, editMode);
    }
    toggleLightMode(): void {
        this.clockContainer.classList.toggle('light-mode');
    }

    toggleFormat(): void {
        this.display.toggleFormat();
    }
}
