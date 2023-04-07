const calculateRound = () => {
  const LATEST_NTH_ROUND = 5;

  const TODAY_DATE = new Date();
  const COMPARE_DATE = new Date(2002, 11, 7);

  const A_WEEK = 60 * 60 * 24 * 1000 * 7;
  const TIME_GAP = Math.floor((TODAY_DATE.getTime() - COMPARE_DATE.getTime()) / A_WEEK) + 1;

  const RETURN_ARRAY = Array.from(
    { length: LATEST_NTH_ROUND },
    (_, i) => TIME_GAP - LATEST_NTH_ROUND + i + 1
  );

  return RETURN_ARRAY.reverse();
};

const calculateDate = round => {
  const COMPARE_DATE = new Date(2002, 11, 7);
  const DATE = new Date(COMPARE_DATE.setDate(COMPARE_DATE.getDate() + (round - 1) * 7));

  return `${DATE.getFullYear()}.${DATE.getMonth() + 1}.${DATE.getDate()}`;
};

module.exports = {
  calculateRound,
  calculateDate,
};
