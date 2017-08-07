const Router = require('koa-router');
const router = new Router();

router.get('/', async function (ctx) {
	const request = require('../helpers/api-request')(ctx);
	const courses = await request('https://xapi.mindflash.com/v3a/trainee-courses');

	ctx.state.courses = courses;

	return ctx.render('index');
});

module.exports = router;
