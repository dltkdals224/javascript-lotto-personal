const express = require('express');
const lottoNumberRoute = require('./lottoNumber.route');
const staticPageRoute = require('./staticPage.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: staticPageRoute,
  },
  {
    path: '/lottoNumber',
    route: lottoNumberRoute,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

module.exports = router;
