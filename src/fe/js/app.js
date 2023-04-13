import Model from './components/model/index.js';
import View from './components/view/index.js';
import Controller from './components/Controller/index.js';

export class Program {
  constructor() {
    this.Main();
  }

  Main() {
    const model = new Model();
    const view = new View(controller);
    const controller = new Controller(model, view);
  }
}
