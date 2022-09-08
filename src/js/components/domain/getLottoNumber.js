const axios = require('axios');
const cheerio = require('cheerio');

async function getLottoHTML() {
  axios({
    url: `https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&qvt=0&query=1031%ED%9A%8C%20%EB%A1%9C%EB%98%90%EB%8B%B9%EC%B2%A8%EB%B2%88%ED%98%B8`,
    method: 'GET',
  })
    .then(response => {
      const $ = cheerio.load(response.data);
      const mainNumber = $(
        '#main_pack > div.sc_new.cs_lotto._lotto > div > div.content_area > div > div > div:nth-child(2) > div.win_number_box > div > div.winning_number'
      ).text();
      const bonusNumber = $(
        '#main_pack > div.sc_new.cs_lotto._lotto > div > div.content_area > div > div > div:nth-child(2) > div.win_number_box > div > div.bonus_number > span'
      ).text();

      const lottoNumber = [...mainNumber.trim().split(' '), bonusNumber];
      return lottoNumber;
    })
    .catch(err => {
      console.error(err);
    });
}

export default getLottoHTML;
