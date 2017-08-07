const request = require('request-promise');

module.exports = function (ctx) {
	return request.defaults({
		json: true,
		headers: { Authorization: ctx.state.creds.token }
	})
}