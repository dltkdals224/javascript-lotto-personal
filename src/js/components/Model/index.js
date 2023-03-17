class Model {
  constructor() {
    // this.uiStep = 1;

    this.purchaseAmount = 0;

    this.selectedNumbers = [];
    this.selectedNumbersList = {};

    this.winningNumberList = {};
  }

  selectPrice(price) {
    // console.log(3);

    const event = new CustomEvent('priceSelected', { detail: { price } });
    window.dispatchEvent(event);
  }
}

export default Model;
