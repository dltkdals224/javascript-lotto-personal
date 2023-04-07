const axios = require('axios');
const cheerio = require('cheerio');

const { flow, trim, split, filter } = require('lodash/fp');

const calculateUtil = require('../util/calculate.util');

const getHtml = async round => {
  try {
    return await axios.get(
      `https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&qvt=0&query=${round}%ED%9A%8C%20%EB%A1%9C%EB%98%90%EB%8B%B9%EC%B2%A8%EB%B2%88%ED%98%B8`
    );
  } catch (error) {
    console.error(error);
  }
};

const getData = async () => {
  const ROUND_ARRAY = calculateUtil.calculateRound();
  const HTML_DATA_ARRAY = await Promise.all(ROUND_ARRAY.map(round => getHtml(round)));

  const DATA_ARRAY = HTML_DATA_ARRAY.map((htmlData, idx) => {
    const $ = cheerio.load(htmlData.data);
    const NUMBER_LIST = $(
      '#main_pack > div.sc_new.cs_lotto._lotto > div > div.content_area > div > div > div:nth-child(2) > div.win_number_box > div'
    ).text();

    return {
      lottoRound: ROUND_ARRAY[idx],
      date: calculateUtil.calculateDate(ROUND_ARRAY[idx]),
      lottoNumber: flow(
        trim,
        split(' '),
        filter(target => target !== '')
      )(NUMBER_LIST),
    };
  });

  return DATA_ARRAY;
};

module.exports = {
  getData,
};
