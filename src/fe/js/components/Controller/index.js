import { isValidAmount, isValidLottoNumber } from '../../util/checkValid';
import generateLottoNumber from '../../util/generateLottoNumber';

import { getLottoInfo } from '../../api/lotto';
import { setSessionStorageItem, getSessionStorageItem } from '../../util/sessionStorage';

import { flow, split } from 'lodash/fp';

class Controller {
  constructor(model, view) {
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

    window.addEventListener('autoButtonClicked', event => {
      this.view.updateLottoNumbers(event.detail);
    });

    window.addEventListener('confirmButtonClicked', event => {
      this.view.reRenderLottoNumberSelectSection(event.detail.isReachAmount);
      this.view.updateLottoNumberSelectedSection(event.detail.selectedLottoNumbersList);
    });

    // eventListener detection
    this.detectChangePriceSelect();
    this.detectClickPurchaseButton();
    this.detectClickAutoButton();
    this.detectClickConfrimButton();
    this.detectClickResetButton();
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

  detectClickAutoButton() {
    const AUTO_BTN = document.getElementById('auto-btn');

    AUTO_BTN.addEventListener('click', event => {
      event.preventDefault();

      this.model.clickAutoButton(generateLottoNumber(45, 6));
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
    });
  }

  detectClickResetButton() {
    const RESET_BTN = document.getElementById('reset-btn');

    RESET_BTN.addEventListener('click', () => {
      location.reload();
    });
  }

  initController() {
    this.initializeData();
    this.scrapLatestLottoNumber();
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
    const LOTTO_NUMBER_CONTAINER = document.getElementById('lotto-number-wrapper');
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

  scrapLatestLottoNumber() {
    if (!getSessionStorageItem('latestLottoNumbers')) {
      (async () => {
        const res = await getLottoInfo();
        this.showScrappedData(res.data);
        setSessionStorageItem('latestLottoNumbers', res.data);
      })();
    } else {
      this.showScrappedData(getSessionStorageItem('latestLottoNumbers'));
    }
  }

  showScrappedData(datas) {
    const LOTTO_ROUND_CONTAINER = document.getElementById('lotto-round-container');

    for (let data of datas) {
      const LOTTO_ROUND = document.createElement('div');

      // ROUND
      const ROUND = document.createElement('strong');
      ROUND.innerText = `${data.lottoRound}회차`;
      ROUND.classList.add('font-bold');
      LOTTO_ROUND.appendChild(ROUND);

      // DATE
      const DATE = document.createElement('span');
      const TRANSLATED_DATE = flow(
        split('.'),
        target => ` (${target[0]}년 ${target[1]}월 ${target[2]}일)`
      )(data.date);
      DATE.innerText = TRANSLATED_DATE;
      DATE.classList.add('font-lighter');
      LOTTO_ROUND.appendChild(DATE);

      // LOTTO NUMBERS
      const NUMBER_LIST = document.createElement('div');
      NUMBER_LIST.classList.add('lottoball-wrapper');
      for (let [idx, number] of data.lottoNumber.entries()) {
        const NUMBER = document.createElement('span');
        NUMBER.innerText = number;
        if (Number(number) >= 1 && Number(number) < 11) {
          NUMBER.classList.add('lottoball-yellow');
        }
        if (Number(number) >= 11 && Number(number) < 21) {
          NUMBER.classList.add('lottoball-blue');
        }
        if (Number(number) >= 21 && Number(number) < 31) {
          NUMBER.classList.add('lottoball-red');
        }
        if (Number(number) >= 31 && Number(number) < 41) {
          NUMBER.classList.add('lottoball-gray');
        }
        if (Number(number) >= 41 && Number(number) <= 45) {
          NUMBER.classList.add('lottoball-green');
        }
        if (idx === 6) {
          const BONUS_NUMBER_INTERVAL = document.createElement('span');
          BONUS_NUMBER_INTERVAL.innerText = '+';
          NUMBER_LIST.appendChild(BONUS_NUMBER_INTERVAL);
        }
        NUMBER_LIST.appendChild(NUMBER);
      }
      LOTTO_ROUND.appendChild(NUMBER_LIST);

      LOTTO_ROUND_CONTAINER.appendChild(LOTTO_ROUND);
    }
  }
}

export default Controller;
