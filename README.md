## StepQuest Fitbit Middleware

This application serves as a middleware layer fot the fitbit game "StepQuest"

It creates some endpoints for connecting to the fitbit oauth2 api and then receiving stepdata from the service.

API Endpoints:

/auth/ -- Start here, this is the basic authorization page. It returns the authorization url. Visit the authorization url to login to the API and grant it permission.

/steps/ -- After logging in, visit this endpoint to get your current step count (for the current day)




When you visit the authorization URL it a redirects you to a page with a random string. This random string is the user id that your authorization tokens are tied to. To play step quest, you need to input this string.
