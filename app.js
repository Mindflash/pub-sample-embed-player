process.on('unhandledRejection', r => console.error(r));

const Koa = require('koa');
const ejs = require('koa-ejs');
const path = require('path');

const app = new Koa();
const port = 7001;

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`>> ${new Date(start).toISOString()} ${ctx.method} ${ctx.url} - ${ms}`);
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

app.use(require('./routes/index').routes());

app.listen(port);
console.log(`Open http://localhost:${port} in the browser.`);

app.on('error', function (err) {
  console.error(err, err.stack);
});
