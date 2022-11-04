const Router = require('koa-router');
const request = require('request-promise').defaults({ json: true });
const router = new Router();
const conf = require('../config');

router.get('/', async function (ctx) {
	const data = await request({
		url: `${conf.apiHost}/api/v3/auth?id=${conf.userId}&courses=${conf.courseId}`,
		headers: { 'x-mindflash-apikey': conf.apiKey }
	});
	ctx.state.embedUrl = data.courses[0].url;

	return ctx.render('index');
});

module.exports = router;
