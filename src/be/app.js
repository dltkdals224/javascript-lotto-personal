const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.set('port', process.env.PORT || 5000);

const routes = require('./routes');
app.use('/', routes);

const logger = require('./config/logger');
app.listen(app.get('port'), () => {
  logger.info('lotto scrapping');
  console.log(app.get('port'), '번 포트에서 대기');
});
