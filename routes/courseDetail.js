const Router = require('koa-router');
const router = new Router();

router.get('/course-detail/:courseId', async function (ctx) {
  const {courseId} = ctx.params;

  const request = require('../helpers/api-request')(ctx);
  const courses = await request('https://xapi.mindflash.com/v3a/trainee-courses');

  const course = courses.find(course => course.id ===courseId);

  ctx.state.course = course;

  return ctx.render('courseDetail');
});

module.exports = router;
