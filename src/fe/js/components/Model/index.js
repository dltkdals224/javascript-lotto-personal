class Model {
  constructor() {
    this.purchaseAmount = 0;
    this.purchaseCount = 0;
    this.confirmedCount = 0;
    this.isconfirmedEnd = false;

    this.selectedLottoNumbers = [];
    this.selectedLottoNumbersList = [];
  }

  selectPrice(price) {
    const EVENT = new CustomEvent('priceSelected', { detail: { price } });
    window.dispatchEvent(EVENT);
  }

  clickPurchaseButton(price) {
    this.purchaseAmount = price;
    this.purchaseCount = this.purchaseAmount / 5000;

    const EVENT = new CustomEvent('purchaseButtonClicked', { detail: { price } });
    window.dispatchEvent(EVENT);
  }

  selectLottoNumber(number) {
    if (this.selectedLottoNumbersList.length >= this.purchaseAmount / 1000) {
      return;
    }

    // TO FIX
    if (this.selectedLottoNumbers.includes(number)) {
      const TARGET_IDX = this.selectedLottoNumbers.indexOf(number);
      this.selectedLottoNumbers.splice(TARGET_IDX, 1);
    } else if (this.selectedLottoNumbers.length < 6) {
      this.selectedLottoNumbers.push(number);
    }

    const EVENT = new CustomEvent('lottoNumberSelected', {
      detail: this.selectedLottoNumbers,
    });
    window.dispatchEvent(EVENT);
  }

  clickAutoButton(numbers) {
    this.selectedLottoNumbers = numbers;

    const EVENT = new CustomEvent('autoButtonClicked', {
      detail: this.selectedLottoNumbers,
    });
    window.dispatchEvent(EVENT);
  }

  clickApplyButton() {
    this.selectedLottoNumbersList.push(this.selectedLottoNumbers);
    this.selectedLottoNumbers = [];

    const EVENT = new CustomEvent('applyButtonClicked', {
      detail: {
        isReachAmount: this.selectedLottoNumbersList.length >= this.purchaseAmount / 1000,
        selectedLottoNumbersList: this.selectedLottoNumbersList,
      },
    });
    window.dispatchEvent(EVENT);
  }

  clickConfirmButton() {
    this.confirmedCount += 1;

    if (this.confirmedCount === this.purchaseCount) {
      this.isconfirmedEnd = true;
    }

    const EVENT = new CustomEvent('confirmButtonClicked', {
      detail: {
        isPurchaseEnd: this.isconfirmedEnd,
        selectedLottoNumbersList: this.selectedLottoNumbersList,
      },
    });
    window.dispatchEvent(EVENT);

    this.selectedLottoNumbers = [];
    this.selectedLottoNumbersList = [];
  }
}

export default Model;
