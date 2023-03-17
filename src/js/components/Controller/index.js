class Controller {
  constructor(model, view) {
    // add eventListener
    window.addEventListener('priceSelected', event => {
      // console.log(4);
      this.view.updateInput(event.detail.price);
    });

    // detect eventListener
    this.detectChangePriceSelect();
    this.detectClickPurchaseButton();

    // init
    this.model = model;
    this.view = view;

    this.initController();
  }

  detectChangePriceSelect() {
    // console.log(1);
    const AMOUNT_SELECT = document.getElementById('purchase-amount-select');

    AMOUNT_SELECT.addEventListener('change', () => {
      const SELECTED_PRICE = AMOUNT_SELECT.options[AMOUNT_SELECT.selectedIndex].value;

      this.selectPrice(Number(SELECTED_PRICE));
    });
  }

  detectClickPurchaseButton() {
    const PURCHASE_BTN = document.getElementById('purchase-btn');

    PURCHASE_BTN.addEventListener('click', event => {
      event.preventDefault();

      const PRICE_INPUT = document.getElementById('purchase-price-input');

      // PRICE_INPUT검증 로직 필요
      this.model.purchaseAmount = Number(PRICE_INPUT.value.replace(/,/g, ''));
      this.view.renderLottoNumberSelectSection();
    });
  }

  initController() {
    this.initializeData();
    this.createLottoNumberField();
  }

  initializeData() {
    this.model.uiStep = 1;

    this.model.purchaseAmount = 0;

    this.model.selectedNumbers = [];
    this.model.selectedNumbersList = {};

    this.model.winningNumberList = {};
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

  selectPrice(price) {
    // console.log(2);

    this.model.selectPrice(price);
  }
}

export default Controller;
