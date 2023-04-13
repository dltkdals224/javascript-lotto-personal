import { colors } from '../../constant';

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
      const APPLY_BTN = document.getElementById('apply-btn');
      APPLY_BTN.disabled = true;
    }
  }

  updateLottoNumberSelectedSection(selectedLottoNumbersList) {
    const SELECTED_LOTTOBALL_DIV = document.getElementById(
      `selected-lottoball-div-${selectedLottoNumbersList.length}`
    );
    const ADDED_LOTTO_NUMBERS = [...selectedLottoNumbersList].pop();
    ADDED_LOTTO_NUMBERS.sort((a, b) => a - b);

    const NUMBER_LIST = document.createElement('div');
    NUMBER_LIST.classList.add('lottoball-broad-wrapper');

    for (let num of ADDED_LOTTO_NUMBERS) {
      const NUMBER = document.createElement('span');
      NUMBER.innerText = num;
      NUMBER.classList.add(colors[Math.floor(num / 10)]);

      NUMBER_LIST.appendChild(NUMBER);
    }

    SELECTED_LOTTOBALL_DIV.innerHTML = '';
    SELECTED_LOTTOBALL_DIV.appendChild(NUMBER_LIST);

    if (selectedLottoNumbersList.length === 5) {
      const AUTO_BTN = document.getElementById('auto-btn');
      AUTO_BTN.disabled = true;
      const APPLY_BTN = document.getElementById('apply-btn');
      APPLY_BTN.disabled = true;

      const CONFIRM_BTN = document.getElementById('confirm-btn');
      CONFIRM_BTN.disabled = false;
    }
  }

  controllButtonStatus(isPurchaseEnd) {
    if (!isPurchaseEnd) {
      const AUTO_BTN = document.getElementById('auto-btn');
      AUTO_BTN.disabled = false;
      const APPLY_BTN = document.getElementById('apply-btn');
      APPLY_BTN.disabled = false;
    }
    const CONFIRM_BTN = document.getElementById('confirm-btn');
    CONFIRM_BTN.disabled = true;
  }

  reRenderSelectedLottoNumberDiv() {
    const ROUND_NUM = 5;
    const NUMBER_NUM = 6;

    for (let i = 1; i <= ROUND_NUM; i++) {
      const SELECTED_LOTTOBALL_DIV = document.getElementById(`selected-lottoball-div-${i}`);
      SELECTED_LOTTOBALL_DIV.innerHTML = '';

      for (let i = 0; i < NUMBER_NUM; i++) {
        const DIV = document.createElement('div');
        DIV.classList.add('lottoball-default');
        SELECTED_LOTTOBALL_DIV.appendChild(DIV);
      }
    }
  }

  updateConfirmedLottoNumberSection(selectedLottoNumbersList) {
    const LOTTO_NUMBER_CONFIRMED_CONTAINER = document.getElementById(
      'lotto-number-confirmed-container'
    );
    const ROUND_WRAPPER = document.createElement('div');

    selectedLottoNumbersList.forEach(lottoList => {
      const NUMBER_LIST = document.createElement('div');
      NUMBER_LIST.classList.add('lottoball-broad-wrapper');

      lottoList.forEach(num => {
        const NUMBER = document.createElement('span');
        NUMBER.innerText = num;
        NUMBER.classList.add(colors[Math.floor(num / 10)]);

        NUMBER_LIST.appendChild(NUMBER);
      });

      ROUND_WRAPPER.appendChild(NUMBER_LIST);
    });

    LOTTO_NUMBER_CONFIRMED_CONTAINER.appendChild(ROUND_WRAPPER);
  }

  initView() {
    this.target = document.getElementById('app');
    this.target.innerHTML = `
      <section id="scrapped-info-section">
        <h2>🎱 지난 회차 번호</h2>
        
        <article id="lotto-round-container">
        </article>
      </section>

      <section id="lotto-section">
        <h1>🎱 로또 번호 추출기</h1>

        <article id="lotto-price-container">
          <div>
              <span class="font-bold">구입할 금액을 입력해주세요.</span>
              <form>
                  <select id="purchase-amount-select">
                      <option value="5000">5,000</option>
                      <option value="10000">10,000</option>
                      <option value="20000">20,000</option>
                      <option value="50000">50,000</option>
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
                  <button id="apply-btn" class="button">적용</button>
              </div>
          </form>
        </article>

        <article id="lotto-number-selected-container" class="display-none">
          <div id="confirmed-lotto-number">
            <span class="font-bold">
              선택번호 확인
              <hr/>
            </span>
            <div id="selected-lotto-number-wrapper">
              <div id="selected-lotto-number-div-1" class="selected-div">
                <div class="selected-inner-div font-normal">
                  A
                  <div id="selected-lottoball-div-1" class="lottoball-broad-wrapper">
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                  </div>
                  <div class="button-wrapper">
                    <button disabled>수정</button>
                    <button disabled>삭제</button>
                    <button disabled>복사</button>
                  </div>
                </div>
                <hr style="color:gray; border-style:dashed"/>
              </div>
              <div id="selected-lotto-number-div-2" class="selected-div">
                <div class="selected-inner-div font-normal">
                  B
                  <div id="selected-lottoball-div-2" class="lottoball-broad-wrapper">
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                  </div>
                  <div class="button-wrapper">
                    <button disabled>수정</button>
                    <button disabled>삭제</button>
                    <button disabled>복사</button>
                  </div>
                </div>
                <hr style="color:gray; border-style:dashed"/>
              </div>
              <div id="selected-lotto-number-div-3" class="selected-div">
                <div class="selected-inner-div font-normal">
                  C
                  <div id="selected-lottoball-div-3" class="lottoball-broad-wrapper">
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                  </div>
                  <div class="button-wrapper">
                    <button disabled>수정</button>
                    <button disabled>삭제</button>
                    <button disabled>복사</button>
                  </div>
                </div>
                <hr style="color:gray; border-style:dashed"/>
              </div>
              <div id="selected-lotto-number-div-4" class="selected-div">
                <div class="selected-inner-div font-normal">
                  D
                  <div id="selected-lottoball-div-4" class="lottoball-broad-wrapper">
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                  </div>
                  <div class="button-wrapper">
                    <button disabled>수정</button>
                    <button disabled>삭제</button>
                    <button disabled>복사</button>
                  </div>
                </div>
                <hr style="color:gray; border-style:dashed"/>
              </div>
              <div id="selected-lotto-number-div-5" class="selected-div">
                <div class="selected-inner-div font-normal">
                  E
                  <div id="selected-lottoball-div-5" class="lottoball-broad-wrapper">
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                    <div class="lottoball-default"></div>
                  </div>
                  <div class="button-wrapper">
                    <button disabled>수정</button>
                    <button disabled>삭제</button>
                    <button disabled>복사</button>
                  </div>
                </div>
              </div>
            </div>
            <hr/>
          </div>
        </article>

        <article id="reset-container" class="display-none">
          <div class="button-wrapper">
            <button id="confirm-btn" class="button" disabled>확정</button>
            <button id="reset-btn" class="button">초기화</button>
          </div>
        </article>
      </section>

      <section id="purchased-lotto-section" >
        <h2>🎱 구매한 로또 번호</h2>

        <article id="lotto-number-confirmed-container"></article>
      </section>
    `;
  }
}

export default View;
