export class Display {
    private container: HTMLElement;
    private hoursContainer: HTMLElement;
    private minutesContainer: HTMLElement;
    private secondsContainer: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
        this.hoursContainer = document.createElement('span');
        this.minutesContainer = document.createElement('span');
        this.secondsContainer = document.createElement('span');

        this.container.appendChild(this.hoursContainer);
        this.container.appendChild(document.createTextNode(':'));
        this.container.appendChild(this.minutesContainer);
        this.container.appendChild(document.createTextNode(':'));
        this.container.appendChild(this.secondsContainer);
    }

    updateTime(time: string): void {
        const [hours, minutes, seconds] = time.split(':');
        this.hoursContainer.textContent = hours;
        this.minutesContainer.textContent = minutes;
        this.secondsContainer.textContent = seconds;
    }

    blinkElement(isBlinking: boolean, editMode: number): void {
        this.hoursContainer.classList.remove('blinking');
        this.minutesContainer.classList.remove('blinking');

        if (isBlinking) {
            if (editMode === 1) {
                this.hoursContainer.classList.add('blinking');
            } else if (editMode === 2) {
                this.minutesContainer.classList.add('blinking');
            }
        }
    }
}