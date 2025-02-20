import { ClockModel } from '../models/ClockModel';
import { ClockView } from '../views/ClockView';

export class ClockController {
    private model: ClockModel;
    private view: ClockView;
    private editMode: number = 0; // 0 = nothing, 1 = hours, 2 = minutes

    constructor(model: ClockModel, view: ClockView) {
        this.model = model;
        this.view = view;

        // Binding the buttons to their respective callback functions
        this.view.bindModeButton(() => this.toggleEditMode());
        this.view.bindIncreaseButton(() => this.increaseTime());
        this.view.bindLightButton(() => this.view.toggleLightMode());
        this.view.bindSwitchFormatButton(() => this.toggleFormat());

        // Initialize the view with the current time
        this.updateView();

        // Listening to events
        this.model.subscribe(() => this.updateView());
    }

    /**
     * Updates the view with the current time from the model and handles blinking based on edit mode.
     */
    private updateView(): void {
        this.view.updateTime(this.model.getTime());
        this.view.blinkElement(this.editMode !== 0, this.editMode);
    }

    /**
     * Toggles the edit mode between nothing (0), hours (1), and minutes (2).
     * It also updates the view to reflect the new mode and starts blinking the selected element.
     */
    private toggleEditMode(): void {
        this.editMode = (this.editMode + 1) % 3;
        this.updateView();
    }

    /**
     * Increments the time based on the current edit mode.
    */
    private increaseTime(): void {
        if (this.editMode === 1) {
            this.model.increaseHours();
        } else if (this.editMode === 2) {
            this.model.increaseMinutes();
        }
        this.updateView();
    }

    /**
     * Toggles the format between 12-hours and 24-hours.
   */
    private toggleFormat(): void {
        this.view.toggleFormat();
        this.updateView();
    }
}
