import { ClockModel } from '../models/ClockModel';
import { ClockView } from '../views/ClockView';
import { ClockController } from '../controllers/ClockController';
import { createHtmlElement } from '../utils/initHtml';

export class Clock {
    model: ClockModel;
    view: ClockView;
    controller: ClockController;

    constructor(containerId: string, gmt: number) {
        const clockContainer = createHtmlElement('div', '', ['clock-container']);
        clockContainer.id = `clock-container-${containerId}`;

        const buttonContainer = createHtmlElement('div', '', []);
        buttonContainer.id = `button-container-${containerId}`;

        const modeButton = createHtmlElement('button', 'Mode', []);
        modeButton.id = `mode-button-${containerId}`;

        const increaseButton = createHtmlElement('button', 'Increment', []);
        increaseButton.id = `increase-button-${containerId}`;

        const switchFormatButton = createHtmlElement('button', 'Switch Format', []);
        switchFormatButton.id = `switch-format-button-${containerId}`;

        const lightButton = createHtmlElement('button', 'Light Mode', []);
        lightButton.id = `light-button-${containerId}`;

        const clockDisplay = createHtmlElement('div', '', ['clock-time']);
        clockDisplay.id = `clockDisplay-container-${containerId}`; // Corrected ID

        const deleteButton = createHtmlElement('button', 'X', ['delete-button']);
        buttonContainer.appendChild(deleteButton);

        deleteButton.addEventListener('click', () => {
            clockContainer.remove();
        });

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