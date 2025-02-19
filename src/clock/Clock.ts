import { ClockModel } from '../models/ClockModel';
import { ClockView } from '../views/ClockView';
import { ClockController } from '../controllers/ClockController'; 

export class Clock {
    model: ClockModel;
    view: ClockView;
    controller: ClockController;
  
    constructor(containerId: string, gmt: number) {

      this.model = new ClockModel(gmt);
      this.view = new ClockView(containerId);
      this.controller = new ClockController(this.model, this.view);
    }
}
