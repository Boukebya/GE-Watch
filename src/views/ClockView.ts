export class ClockView {
    private clockContainer: HTMLElement;
    private modeButton: HTMLElement;
    private increaseButton: HTMLElement;
    private lightButton: HTMLElement;

    private hoursContainer: HTMLElement;
    private minutesContainer: HTMLElement;
    private secondsContainer: HTMLElement;

    constructor() {
      // DOM elements
      this.clockContainer = document.getElementById('clock-container')!;
      this.modeButton = document.getElementById('mode-button')!;
      this.increaseButton = document.getElementById('increase-button')!;
      this.lightButton = document.getElementById('light-button')!;
      
      // We separate time
      this.hoursContainer = document.createElement('span');
      this.minutesContainer = document.createElement('span');
      this.secondsContainer = document.createElement('span');
      
      // Add : separators
      this.clockContainer.appendChild(this.hoursContainer);
      this.clockContainer.appendChild(document.createTextNode(':'));
      this.clockContainer.appendChild(this.minutesContainer);
      this.clockContainer.appendChild(document.createTextNode(':'));
      this.clockContainer.appendChild(this.secondsContainer);
    }

    /**
    * Update time on display
    * 
    * @param {string} time - Display hour with 'hh:mm:ss' format.
    */
    updateTime(time: string): void {
        const [hours, minutes, seconds] = time.split(':');
        this.hoursContainer.textContent = hours;
        this.minutesContainer.textContent = minutes;
        this.secondsContainer.textContent = seconds;
    }
  

    /**
    * Bind Mode button
    * 
    */
    bindModeButton(callback: () => void): void {
      this.modeButton.addEventListener('click', callback);
    }
    
    /**
    * Bind Increincrease time button
    * 
    */
    bindIncreaseButton(callback: () => void): void {
      this.increaseButton.addEventListener('click', callback);
    }

    /**
    * Bind Light mode button
    * 
    */
    bindLightButton(callback: () => void): void {
      this.lightButton.addEventListener('click', callback);
    }

    /**
    * Blinking time element method
    * 
    * @param {boolean} isBlinking - Current blinking state
    * @param {number} editMode - Actual edition mode (1 = hours, 2 = minutes)
    */
    blinkElement(isBlinking: boolean, editMode: number): void {
      // Reinit blink
      this.hoursContainer.classList.remove('blinking');
      this.minutesContainer.classList.remove('blinking');
      
      // Manage blinking based on edit mode
      if (isBlinking) {
        if (editMode === 1) {
          this.hoursContainer.classList.add('blinking');
        } else if (editMode === 2) {
          this.minutesContainer.classList.add('blinking');
        }
      }
    }

    /**
    * Toggle light mode for clock container
    * 
    */
    toggleLightMode(): void {
      this.clockContainer.classList.toggle('light-mode');
    }
}
