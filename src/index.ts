import './css/clock.css';
import './css/index.css';
import { Clock } from './classes/ClockClass';

let clockCounter = 1;

document.addEventListener("DOMContentLoaded", () => {
    const addClockButton = document.getElementById('add-clock-button');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Enter GMT Offset</h2>
            <input type="number" id="gmt-offset" value="0">
            <button id="create-clock">Create Clock</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Show the modal
    if (addClockButton) {
        addClockButton.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }

    const closeButton = modal.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none'; // Hide the modal
        });
    }

    const createClockButton = modal.querySelector('#create-clock');
    if (createClockButton) {
        createClockButton.addEventListener('click', () => {
            const gmtOffset = parseInt((document.getElementById('gmt-offset') as HTMLInputElement).value, 10) || 0;
            new Clock(`clock-${clockCounter}`, gmtOffset);
            clockCounter++;
            modal.style.display = 'none'; // Remove modal
        });
    }

    new Clock('clock-0', 0);
});