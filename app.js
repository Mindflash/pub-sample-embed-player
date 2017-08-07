process.on('unhandledRejection', r => console.error(r));

const Koa = require('koa');

const ejs = require('koa-ejs');
const path = require('path');

const app = new Koa();

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log(`${start} ${ctx.method} ${ctx.url}`);
  await next();
  const ms = Date.now() - start;
  console.log(`>> ${start} ${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(require('koa-static')('public'));

ejs(app, {
  root: path.join(__dirname, 'views'),
  viewExt: 'ejs',
});
app.use(function (ctx, next) {
  ctx.state = ctx.state || {};
  return next();
});

app.use(require('./helpers/verifyAuthCreds'));

app.use(require('./routes/index').routes());
app.use(require('./routes/courseDetail').routes());
app.use(require('./routes/viewCourse').routes());

if (process.env.NODE_ENV === 'test') {
  module.exports = app.callback();
} else {
  app.listen(7001);
  console.log('open http://localhost:7001');
}

app.on('error', function (err) {
  console.error(err, err.stack);
});