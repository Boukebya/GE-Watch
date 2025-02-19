import { ClockModel } from '../models/ClockModel';
import { ClockView } from '../views/ClockView';
import { ClockController } from '../controllers/ClockController';

export class Clock {
    model: ClockModel;
    view: ClockView;
    controller: ClockController;

    constructor(containerId: string, gmt: number) {
        const clockContainer = document.createElement('div');
        clockContainer.id = `clock-container-${containerId}`;
        clockContainer.classList.add('clock-container');

        const buttonContainer = document.createElement('div');
        buttonContainer.id = `button-container-${containerId}`;

        const modeButton = document.createElement('button');
        modeButton.id = `mode-button-${containerId}`;
        modeButton.textContent = 'Mode';

        const increaseButton = document.createElement('button');
        increaseButton.id = `increase-button-${containerId}`;
        increaseButton.textContent = 'Increment';

        const switchFormatButton = document.createElement('button');
        switchFormatButton.id = `switch-format-button-${containerId}`;
        switchFormatButton.textContent = 'Switch Format';

        const lightButton = document.createElement('button');
        lightButton.id = `light-button-${containerId}`;
        lightButton.textContent = 'Light Mode';

        const clockDisplay = document.createElement('div');
        clockDisplay.id = `clock-container-${containerId}`;
        clockDisplay.classList.add('clock-time');

        // Append elements
        buttonContainer.appendChild(modeButton);
        buttonContainer.appendChild(increaseButton);
        buttonContainer.appendChild(switchFormatButton);
        buttonContainer.appendChild(lightButton);

        clockContainer.appendChild(buttonContainer);
        clockContainer.appendChild(clockDisplay);

        // Append the main container to the DOM:
        document.body.appendChild(clockContainer);

        // Initialize Model, View, and Controller
        this.model = new ClockModel(gmt);
        this.view = new ClockView(clockDisplay, modeButton, increaseButton, lightButton, switchFormatButton);
        this.controller = new ClockController(this.model, this.view);
    }
}
