const Router = require('koa-router');
const router = new Router();

router.get('/view-course/:modId/:courseId', async function (ctx) {
	const {courseId, modId} = ctx.params;

	const request = require('../helpers/api-request')(ctx);
	const course = await request(`https://xapi.mindflash.com/v3a/launch-course/${modId}/${courseId}`);

	ctx.state.course = course;
	ctx.state.backUrl = `/course-detail/${courseId}`;

	return ctx.render('viewCourse');
});

module.exports = router;
