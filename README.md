# Sample Player Embed App
This project demonstrates a simple embed player implementation.

## How to run
Use [NodeJS](https://nodejs.org/) 19+ to run the app.

After cloning the repo, install dependencies:
```
npm install
```
Edit `config.js`: put in your API secret key, user Id and course Id.
- API secret key: Your standard api secret key. Note: this is just a sample implementation. You should store and use the api key according to your application's secrets handling practices
- User Id: Actual Trakstar Learn user identifier.
- Course Id: Actual Trakstar Learn course identifier.
- User and course identifiers are specified in the `config.js` only for demonstration purposes. They should be loaded dynamically in real implementation.
- User and course identifiers can be retrived from the standard [Trakstar Learn Api](http://mindflash.github.io/mf-api-example/app/index.html#/v3) and may be stored in your system for future use depending on the implementation.

Specified course will be loaded in the player for the specified user.

Start the app:
```
npm start
```
The server should start listening on port 7001. Open a browser and navigate to `http://localhost:7001`.

This should load a page with a header and an iframe that displays Learn player with the course specified in the `config.js` file.

## API details
### Prerequisites
Standard [Trakstar Learn Api](http://mindflash.github.io/mf-api-example/app/index.html#/v3) should be used to retrieve users and courses details that belong to your account. Your app should be aware of user and course IDs before player embed url can be retrieved.
### Obtaining a signed URL
Signed url allows to authenticate a user and load specific course in the player automatically. Signed url can be used with iframes.

> Please note that the endpoint that generates a signed url for a specific course is meant to auto-enroll a user to the course if user is not enrolled already. So it is your responsibility to make sure the user is allowed (has access) to take the specified course.

API details to obtain the signed url can be found [here (Trakstar Learn Api)](http://mindflash.github.io/mf-api-example/app/index.html#/v3). Navigate to **Authorize User** under **Users** section. Scroll down to **Examples** and expand *Example: Authorization for course enrollment* for the sample request and response details.

You can also use the API reference page to test with your production environment. Just go down to **Try It!** section, put in your api secret key and save it, specify query string params and **Fetch**.
