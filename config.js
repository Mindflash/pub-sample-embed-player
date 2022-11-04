module.exports = {
	apiHost: 'https://api.learn.trakstar.com',
	// Trakstar Learn API secret key - should be stored and used according to your application's secrets handling practices
	apiKey: process.env.LEARN_API_KEY || 'trakstarLearnApiKey',
	// Trakstar Learn User Id - Should be retrieved from the standard Trakstar Learn API
	userId: 12345,
	// Trakstar Learn Course Id - Should be retrieved from the standard Trakstar Learn API
	courseId: 23456
};
