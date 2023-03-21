import { isValidAmount, isValidLottoNumber } from '../../util/checkValid';

class Controller {
  constructor(model, view) {
    // init
    this.model = model;
    this.view = view;

    this.initController();

    // eventListener subscription
    window.addEventListener('priceSelected', event => {
      this.view.updateInput(event.detail.price);
    });

    window.addEventListener('purchaseButtonClicked', () => {
      this.view.updateInputValue();
      this.view.renderLottoNumberSelectSection();
    });

    window.addEventListener('lottoNumberSelected', event => {
      this.view.updateLottoNumbers(event.detail);
    });

    window.addEventListener('confirmButtonClicked', event => {
      this.view.reRenderLottoNumberSelectSection();
      this.view.updateLottoNumberSelectedSection(event.detail);
    });

    // eventListener detection
    this.detectChangePriceSelect();
    this.detectClickPurchaseButton();
    this.detectClickConfrimButton();
  }

  detectChangePriceSelect() {
    const AMOUNT_SELECT = document.getElementById('purchase-amount-select');
    const PRICE_INPUT = document.getElementById('purchase-price-input');

    AMOUNT_SELECT.addEventListener('change', () => {
      const SELECTED_PRICE = AMOUNT_SELECT.options[AMOUNT_SELECT.selectedIndex].value;
      PRICE_INPUT.type = SELECTED_PRICE === 'auto' ? 'number' : 'text';

      this.model.selectPrice(Number(SELECTED_PRICE));
    });
  }

  detectClickPurchaseButton() {
    const PURCHASE_BTN = document.getElementById('purchase-btn');
    const AMOUNT_SELECT = document.getElementById('purchase-amount-select');

    PURCHASE_BTN.addEventListener('click', event => {
      event.preventDefault();

      const PRICE_INPUT = document.getElementById('purchase-price-input');
      const PRICE = Number(PRICE_INPUT.value.replace(/,/g, ''));

      if (isValidAmount(PRICE)) {
        this.model.clickPurchaseButton(PRICE);

        PURCHASE_BTN.disabled = true;
        PRICE_INPUT.disabled = true;
        AMOUNT_SELECT.disabled = true;
      } else {
        alert('금액이 잘못 입력되었습니다.');
      }
    });
  }

  detectClickConfrimButton() {
    const CONFIRM_BTN = document.getElementById('confirm-btn');

    CONFIRM_BTN.addEventListener('click', event => {
      event.preventDefault();

      if (isValidLottoNumber(this.model.selectedLottoNumbers)) {
        this.model.clickConfirmButton();
      } else {
        alert('6개의 숫자를 클릭해주세요.');
      }

      if (this.model.selectedLottoNumbersList.length >= this.model.purchaseAmount / 1000) {
        const LOTTO_NUMBER_SELECT_SECTION = document.getElementById('lotto-number-select-section');
        LOTTO_NUMBER_SELECT_SECTION.classList.add('display-none');
      }
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

      LOTTO_NUMBER.addEventListener('click', event => {
        this.model.selectLottoNumber(Number(event.target.innerText));
      });

      LOTTO_NUMBER_CONTAINER.appendChild(LOTTO_NUMBER);
    }
  }
}

export default Controller;
