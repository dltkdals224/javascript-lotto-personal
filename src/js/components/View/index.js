class View {
  constructor(controller) {
    this.controller = controller;

    this.initView();
  }

  updateInput(price) {
    // console.log(5);

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

  renderLottoNumberSelectSection() {
    const LOTTO_NUMBER_SELECT_SECTION = document.getElementById('lotto-number-select-section');
    LOTTO_NUMBER_SELECT_SECTION.classList.remove('display-none');
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
                <span>구입할 금액을 입력해주세요.</span>
                <form>
                    <select id="purchase-amount-select">
                        <option value="5000">5,000</option>
                        <option value="10000">10,000</option>
                        <option value="15000">15,000</option>
                        <option value="20000">20,000</option>
                        <option value="auto" selected>직접 입력</option>
                    </select>
                    <input id="purchase-price-input" placeholder="금액" />
                    <button id="purchase-btn" class="button">구입</button>
                </form>
            </div>
        </section>

        <section id="lotto-number-select-section" class="display-none">
            <h2 class="display-none">구입 번호 입력</h2>
            <form id="lotto-number-form">
                <div id="lotto-number-container"></div>
                <div class="button-container">
                    <button class="button">자동</button>
                    <button class="button">확정</button>
                </div>
            </form>
        </section>

        <section id="lotto-number-selected-section" class="display-none">
            <h2 class="display-none">구입 번호</h2>
        
            <span>구매한 번호</span>
            <div id="selected-lotto-number-container"></div>
        </section>

        <section id="lotto-number-selected-section" class="display-none">
            <h2 class="display-none">지난 회차 정보</h2>

            <span>지난 회차의 당첨번호</span>
            <div class="last-lotto-number"></div>

            <div class="space-between margin-top">
                <span>1,2,3,4,5</span>
            <span>6</span>
            </div>
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
