class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();
  }

  init() {
    this.initializeData();
    this.createLottoNumberField();
  }

  initializeData() {
    console.log(this.model.purchaseAmount);
  }

  createLottoNumberField() {
    const LOTTO_NUMBER_CONTAINER = document.getElementById('lotto-number-container');
    const LOTTO_NUMBER_MAX_LENGTH = 45;

    for (let number = 1; number <= LOTTO_NUMBER_MAX_LENGTH; number++) {
      const LOTTO_NUMBER = document.createElement('div');

      LOTTO_NUMBER.id = `lotto-number-${number}`;
      LOTTO_NUMBER.classList.add('lotto-number');
      LOTTO_NUMBER.innerText = number;

      LOTTO_NUMBER_CONTAINER.appendChild(LOTTO_NUMBER);
    }
  }
}

export default Controller;
