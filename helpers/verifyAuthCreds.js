const request = require('request-promise').defaults({ json: true });
const cfg = require('../config');

const maxTokenAge = 1000 * 60 * 90;

module.exports = async function verifyAuthCreds(ctx, next) {
	/*
	Have to fetch user credentials from Mindflash. The lookup needs either the
	Mindflash userId, email address, or username (if used). Normally this would
	be provided from the customer app which is hosting this logic. For the
	purposes of this sample, let's cheat and assume the email is on the
	querystring. Do NOT leave it this way -- it's very insecure.
	*/
	const userEmail = ctx.query.testEmail;
	if (userEmail) {
		// If an email is set, always fetch a fresh token to make this easier to test and switch users without clearing cookies.
		const creds = await request({
			url: 'https://xapi.mindflashtms.com/v3a/token?email=' + userEmail,
			headers: { 'x-mindflash-Apikey': cfg.mfKey }
		});

		//Write the creds into a cookie for later use
		ctx.cookies.set('mfCreds', JSON.stringify(creds), { maxAge: maxTokenAge });
		ctx.state.creds = creds;
	} else {
		// No email specified, try reusing what's in the cookie
		const credsStr = ctx.cookies.get('mfCreds');
		if (credsStr) {
			ctx.state.creds = JSON.parse(credsStr);
		} else {
			ctx.throw(400, 'No email specified. Add this to your url to simulate an integration with Mindflash: ?testEmail=[trainee email address]')
		}
	}

	return next();
}
