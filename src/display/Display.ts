export class Display {
    private container: HTMLElement;
    private hoursContainer: HTMLElement;
    private minutesContainer: HTMLElement;
    private secondsContainer: HTMLElement;
    private ampmContainer: HTMLElement;
    private is24HourFormat: boolean = true;

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
        this.ampmContainer = document.createElement('span');
        this.container.appendChild(this.ampmContainer);
    }

updateTime(time: string): void {
    let [hours, minutes, seconds] = time.split(':');
    let displayHours = hours;
    let ampm = '';

    if (!this.is24HourFormat) {
        let hoursNum = parseInt(hours, 10);
        ampm = hoursNum < 12 || hoursNum === 24 ? 'AM' : 'PM';

        if (hoursNum === 0) {
            displayHours = "12";
        } else if (hoursNum === 12) {
            displayHours = "12";
        } else {
            displayHours = (hoursNum % 12).toString();
        }
        displayHours = displayHours.padStart(2, '0');
    }

    this.hoursContainer.textContent = displayHours;
    this.minutesContainer.textContent = minutes;
    this.secondsContainer.textContent = seconds;
    this.ampmContainer.textContent = ampm;
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

    toggleFormat(): void {
        this.is24HourFormat = !this.is24HourFormat;
    }
}