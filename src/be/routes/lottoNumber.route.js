const express = require('express');
const { lottoNumberScrapController } = require('../controllers');

const router = express.Router();

router.route('/').get(async (req, res) => {
  const data = await lottoNumberScrapController.getData();
  res.json(data);
});

module.exports = router;
