import Model from './components/model/index.js';
import View from './components/view/index.js';
import Controller from './components/controller/index.js';

const model = new Model();
const view = new View();
const controller = new Controller(model);
