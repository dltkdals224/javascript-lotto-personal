class View {
  constructor(controller) {
    this.controller = controller;

    this.initView();
  }

  updateInput(price) {
    const PRICE_INPUT = document.getElementById('purchase-price-input');

    if (isNaN(price)) {
      PRICE_INPUT.disabled = false;
      PRICE_INPUT.value = '';
    }
    if (!isNaN(price)) {
      PRICE_INPUT.disabled = true;
      PRICE_INPUT.value = price.toLocaleString('ko-KR');
    }
  }

  updateInputValue() {
    const PRICE_INPUT = document.getElementById('purchase-price-input');

    if (PRICE_INPUT.type == 'number') {
      PRICE_INPUT.type = 'text';
      PRICE_INPUT.value = Number(PRICE_INPUT.value).toLocaleString('ko-KR');
    }
    if (PRICE_INPUT.type === 'text') {
      PRICE_INPUT.type = 'text';
    }
  }

  renderLottoNumberSelectSection() {
    const LOTTO_NUMBER_SELECT_SECTION = document.getElementById('lotto-number-select-container');
    LOTTO_NUMBER_SELECT_SECTION.classList.remove('display-none');

    const LOTTO_NUMBER_SELECTED_SECTION = document.getElementById(
      'lotto-number-selected-container'
    );
    LOTTO_NUMBER_SELECTED_SECTION.classList.remove('display-none');

    const RESET_SECTION = document.getElementById('reset-container');
    RESET_SECTION.classList.remove('display-none');
  }

  updateLottoNumbers(lottoArray) {
    const NODE_LIST = document.querySelectorAll('.lotto-number');

    NODE_LIST.forEach(node => {
      const LOTTO_NUMBER = Number(node.id.split('-')[2]);

      // TO FIX
      // IDEA: fxJS
      node.classList.remove('disabled');

      if (lottoArray.length !== 6) {
        if (lottoArray.includes(LOTTO_NUMBER)) {
          node.classList.add('clicked');
        } else {
          node.classList.remove('clicked');
        }
      }
      if (lottoArray.length === 6) {
        if (lottoArray.includes(LOTTO_NUMBER)) {
          node.classList.add('clicked');
        } else {
          node.classList.add('disabled');
        }
      }
    });
  }

  reRenderLottoNumberSelectSection(isReachAmount) {
    const NODE_LIST = document.querySelectorAll('.lotto-number');

    NODE_LIST.forEach(node => {
      node.classList.remove('disabled');
      node.classList.remove('clicked');
    });

    if (isReachAmount) {
      NODE_LIST.forEach(node => {
        node.classList.add('disabled');
      });

      const AUTO_BTN = document.getElementById('auto-btn');
      AUTO_BTN.disabled = true;
      const CONFIRM_BTN = document.getElementById('confirm-btn');
      CONFIRM_BTN.disabled = true;
    }
  }

  updateLottoNumberSelectedSection(selectedLottoNumbersList) {
    const SELECTED_LOTTO_NUMBER_CONTAINER = document.getElementById(
      'selected-lotto-number-wrapper'
    );
    const ADDED_LOTTO_NUMBERS = [...selectedLottoNumbersList].pop();
    const DIV = document.createElement('div');

    ADDED_LOTTO_NUMBERS.sort((a, b) => a - b).forEach((number, idx) => {
      if (idx === ADDED_LOTTO_NUMBERS.length - 1) {
        DIV.innerText += `${number}`;
      } else {
        DIV.innerText += `${number}, `;
      }
    });

    SELECTED_LOTTO_NUMBER_CONTAINER.appendChild(DIV);
  }

  initView() {
    this.target = document.getElementById('app');
    this.target.innerHTML = `
      <section id="scrapped-info-section" >
        <h2 class="display-none">지난 회차 번호</h2>
        
        지난 회차 번호
      </section>

      <section id="lotto-section">
        <h2 class="display-none">로또 번호 추출</h2>

        <article>
          <h1>🎱 로또 번호 추출기</h1>
        </article>

        <article id="lotto-price-container" >
          <div>
              <span class="title">구입할 금액을 입력해주세요.</span>
              <form>
                  <select id="purchase-amount-select">
                      <option value="5000">5,000</option>
                      <option value="10000">10,000</option>
                      <option value="auto" selected>직접 입력</option>
                  </select>
                  <input id="purchase-price-input" placeholder="금액" type="number"/>
                  <button id="purchase-btn" class="button">구입</button>
              </form>
          </div>
        </article>

        <article id="lotto-number-select-container" class="display-none">
          <form id="lotto-number-form">
              <div id="lotto-number-wrapper"></div>
              <div class="button-wrapper">
                  <button id="auto-btn" class="button">자동</button>
                  <button id="confirm-btn" class="button">확정</button>
              </div>
          </form>
        </article>

        <article id="lotto-number-selected-container" class="display-none">
          <div id="confirmed-lotto-number">
            <span class="title">구매한 번호</span>
            <div id="selected-lotto-number-wrapper"></div>
          </div>
        </article>

        <article id="reset-container" class="display-none">
          <button id="reset-btn" class="button">초기화</button>
        </article>
      </section>

      <section id="purchased-lotto-section" >
        <h2 class="display-none">구매한 로또 번호</h2>

        구매한 번호
      </section>
    `;
  }
}

export default View;
