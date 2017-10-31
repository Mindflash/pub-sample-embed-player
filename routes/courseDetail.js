const Router = require('koa-router');
const router = new Router();

router.get('/course-detail/:courseId', async function (ctx) {
	const {courseId} = ctx.params;

	const request = require('../helpers/api-request')(ctx);
	const courses = await request('https://xapi.mindflashtms.com/v3a/trainee-courses');

	// Grab just the course indicated in the url param
	const course = courses.find(course => course.id === courseId);

	// State is used to render ejs templates
	ctx.state.course = course;

	return ctx.render('courseDetail');
});

module.exports = router;
