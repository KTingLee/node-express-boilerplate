const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

// NOTE: 這種寫法不好，看起來好花＠＠
// 直接 router.use(route.path, route.route); 條列出來就好
// 以下寫法雖然用 forEach 省去過多 router.use，但其實不太容易看出有哪些 route
// 而且，不同的 route 可能會夾帶不同中間層

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
