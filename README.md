# pub-sample-embed-player
Trainee overview and embed player sample implementation

This project is meant to demonstrate a minimum Mindflash trainee overview and embed player implementation based on a beta extended API.

### How to run
This project required NodeJS 8+ https://nodejs.org/
After cloning the repo, install depenencies with
```
npm install
```
Edit `config.js` and put your API secret key in. Now start the server with
```
npm start
```
The server should start listening on port 7001. Open a browser and point to `http://localhost:7001?testEmail=a-trainee-in-your-portal@example.com`. Be sure to use the email address of a user in your Mindflash account. This simulates the connection between your system and Mindflash.

### Obtaining a user token
**GET**  `https://xapi.mindflash.com/v3a/token?email=<trainee email>`

**GET**  `https://xapi.mindflash.com/v3a/token?id=<trainee id>`

This endpoint returns basic user info along with a time-limited token you can use in other extended API calls. This token is specific to the user and expires after 90 minutes. This token is designed to be sent to a client single-page app, allowing it to make extended API calls directly. Of course, the token can still be used in a server-rendered app such as in this sample project.

This endpoint requires your account secret key in the `x-mindflash-apikey` header. Do not put your account secret key in a client app. Make this call from the server and send the token to the client app instead.

###### Example
`curl 'https://xapi.mindflash.com/v3a/token?id=12345678' -H 'x-mindflash-Apikey: <your account secret key>'`

```javascript
{
  "token": "apWajnolzLku-SAMPLE-rIkgfeglw30=",
  "userId": "12345678",
  "email": "matt@example.com",
  "firstName": "Matt",
  "lastName": "Smith"
}
```


### Get trainee course data
**GET**  `https://xapi.mindflash.com/v3a/trainee-courses`

This endpoint returns comprehensive data about the courses a trainee has access to. This includes not only courses they have been invited to directly, but also any courses they have access to via catalogs (respecting group membership). Much of what you will need to build a custom trainee dashboard/overview experience is contained in this call. Note that you cannot specify the user for which to fetch this data -- that is contained in the user-specific token received above.

###### Example
`curl 'https://xapi.mindflash.com/v3a/trainee-courses' -H 'authorization: apWajnolzLku-SAMPLE-rIkgfeglw30='`

```javascript
[
  {
    "id": "196994",
    "name": "Sonic Screwdriver 101",
    "desc": "Everything. More or less.",
    "status": "started",
    "gradeStatus": null,
    "score": null,
    "passingScore": 60,
    "lastActivity": "2017-08-07T06:46:57.000Z",
    "thumbUrl": "https://....example.png",
    "trainerName": "David",
    "trainerEmail": "dtennant@example.com",
    "trainerImageUrl": "https://....example.png",
    "modules": [
      {
        "id": "19479",
        "name": "Part 1: Safety Features",
        "desc": "Safety first.",
        "type": "online",
        "status": "completed",
        "lastActivity": "2017-08-07T06:46:57.000Z",
        "gradeStatus": "passed",
        "score": 70,
        "passingScore": 60,
        "thumbUrl": "https://....example.png",
        "locked": false
      },
      {
        "id": "19004",
        "name": "Part 2: Disabling Safety Features",
        "desc": "Use only in case of emergency",
        "type": "online",
        "status": "invited",
        "lastActivity": null,
        "gradeStatus": null,
        "score": null,
        "passingScore": 60,
        "thumbUrl": https://....example.png",
        "locked": false
      },
      ...
    ]
  },
  {
    "id": "196994",
    "name": "Sonic Screwdriver 102",
    ...
  }
]
```

There are a few things to take note of here:
* This follows the simpler model of modules-in-courses instead of the current courses-in-series. Mostly this is just renaming courses to modules and series to courses and allow inviting only to courses, not directly to modules. This sadly could be a source of confusion as we transition over to the new model, but does make things easier to understand in the long run.
  - One caveat is if you have trainees invited to a course which is not part of a series, it will not show up in this result -- always use series for best results and easier transition later.
* `locked` indicates if a module (formerly course) is currently accessible in the course (formerly series). In courses which have an enforced order, `locked` will be true on a module if the trainee has not passed the previous modules.
* All IDs are strings, in contrast to our previous API. Do not coerce the IDs to numbers; a future revision may make use of non-numeric IDs.

### Get embed player url
**GET**  `https://xapi.mindflash.com/v3a/launch-course/{moduleId}/{courseId}`

This endpoint returns a url suitable for embedding in an iframe. This can be used to provide a seamless training experience in a customer's own application. Both `moduleId` and `courseId` are required.

Note this link directly creates a session for the trainee in Mindflash -- no additional SSO step is required as long as the trainee has been added to Mindflash previously. This can simplify some SSO scenarios, but care should be taken not to post publicly the url returned in this response.  Additionally the trainee also does not need to have been invited to the course or otherwise have access. In other words, this endpoint can be used to bypass group restrictions and enrollment. This can be very useful if you are creating your own catalog based on custom logic not in Mindflash, but care must be taken to enforce permissions.

###### Example
`curl 'https://xapi.mindflash.com/v3a/launch-course/19004/196994' -H 'authorization: apWajnolzLku-SAMPLE-rIkgfeglw30='`

```javascript
{
  "url": "https://mycompany.mindflash.com/connect?d=iJKV1QiLC-SAMPLE-k49H635"
}
```
