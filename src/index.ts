import './styles/clock.css';
import { ClockController } from './controllers/ClockController';
import { ClockView } from './views/ClockView';
import { ClockModel } from './models/ClockModel';



document.addEventListener("DOMContentLoaded", () => {
    const model = new ClockModel();
    const view = new ClockView();
    new ClockController(model, view);
  });
  
