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
    const LOTTO_NUMBER_SELECT_SECTION = document.getElementById('lotto-number-select-section');
    LOTTO_NUMBER_SELECT_SECTION.classList.remove('display-none');

    const LOTTO_NUMBER_SELECTED_SECTION = document.getElementById('lotto-number-selected-section');
    LOTTO_NUMBER_SELECTED_SECTION.classList.remove('display-none');
  }

  updateLottoNumbers(lottoArray) {
    const NODE_LIST = document.querySelectorAll('.lotto-number');

    NODE_LIST.forEach(node => {
      const LOTTO_NUMBER = Number(node.id.split('-')[2]);

      // TO FIX
      // IDEA: fxJS
      if (lottoArray.length !== 6) {
        node.classList.remove('disabled');
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

  reRenderLottoNumberSelectSection() {
    const NODE_LIST = document.querySelectorAll('.lotto-number');

    NODE_LIST.forEach(node => {
      node.classList.remove('disabled');
      node.classList.remove('clicked');
    });
  }

  updateLottoNumberSelectedSection(list) {
    const SELECTED_LOTTO_NUMBER_CONTAINER = document.getElementById(
      'selected-lotto-number-container'
    );
    const ADDED_LOTTO_NUMBERS = [...list].pop();
    const DIV = document.createElement('div');

    ADDED_LOTTO_NUMBERS.forEach((number, idx) => {
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
        <section>
            <h1>🎱 로또 번호 추출기</h1>
        </section>

        <section id="lotto-price-section" >
            <h2 class="display-none">구입 금액 입력</h2>

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
        </section>

        <section id="lotto-number-select-section" class="display-none">
            <h2 class="display-none">구입 번호 입력</h2>
            <form id="lotto-number-form">
                <div id="lotto-number-container"></div>
                <div class="button-container">
                    <button id="auto-btn" class="button">자동</button>
                    <button id="confirm-btn" class="button">확정</button>
                </div>
            </form>
        </section>

        <section id="lotto-number-selected-section" class="display-none">
            <h2 class="display-none">구입 번호</h2>
        
            <div id="confirmed-lotto-number">
              <span class="title">구매한 번호</span>
              <div id="selected-lotto-number-container"></div>
            </div>
        </section>

        <section id="scrapped-section" >
            <h2 class="display-none">지난 회차 정보</h2>
        </section>
    `;
  }
}

export default View;

{
  /* <div id="lotto-number-onoff__radio" class="ckbx-style-11">
  <input type="checkbox" id="ckbx-style-11-1" value="0" name="ckbx-style-11" />
  <label for="ckbx-style-11-1"></label>
</div>; */
}
