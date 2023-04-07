export const isValidAmount = price => {
  // TO FIX
  if (!isNaN(price) && typeof price === 'number' && price > 0 && price % 5000 === 0) {
    return true;
  }
  return false;
};

export const isValidLottoNumber = array => {
  const MAX_LOTTO_NUMBER = 6;

  if (array.length === MAX_LOTTO_NUMBER) {
    return true;
  }
  return false;
};
