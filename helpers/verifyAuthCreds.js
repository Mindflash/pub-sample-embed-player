const request = require('request-promise').defaults({ json: true });
const cfg = require('../config');

const maxTokenAge = 1000 * 60 * 90;

module.exports = async function verifyAuthCreds(ctx, next) {
	//For this sample, we're going to keep the creds in a cookie.
	const credsStr = ctx.cookies.get('mfCreds');
	console.log('credsStr',credsStr)
	if (credsStr) {
		ctx.state.creds = JSON.parse(credsStr);
	} else {
		/*
		Have to fetch user credentials from Mindflash. The lookup needs either the 
		Mindflash userId, email address, or username (if used). Normally this would
		be provided from the customer app which is hosting this logic. For the 
		purposes of this sample, let's cheat and assume the email is on the 
		querystring. Do NOT leave it this way -- it's very insecure.
		*/
		const userEmail = ctx.query.testEmail;

		const creds = await request({
			url: 'https://xapi.mindflash.com/v3a/token?email=' + userEmail,
			headers: { 'x-mindflash-Apikey': cfg.mfKey }
		});

		console.log('creds', creds)

		//Write the creds into a cookie for later use
		ctx.cookies.set('mfCreds', JSON.stringify(creds), { maxAge: maxTokenAge });
		ctx.state.creds = creds;
	}
	return next();
}