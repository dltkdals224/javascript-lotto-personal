const generateLottoNumber = (totalIndex, selectingNumber) => {
  let randomIndexArray = [];

  for (let i = 0; i < selectingNumber; i++) {
    let randomNum = Math.floor(Math.random() * totalIndex);

    if (randomIndexArray.indexOf(randomNum + 1) === -1) {
      randomIndexArray.push(randomNum + 1);
    } else {
      i--;
    }
  }
  return randomIndexArray;
};

export default generateLottoNumber;
