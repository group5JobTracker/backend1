# Dragonfly Backend API

This is the internal API that we will be using to do CRUD operations on our app. There are currently two main routes that we will be using to support the main dashboard view. One is url/auth, which will be used to allow customers to be able to login and sign up. The other is url/applications, which will house all the routes to do CRUD operations for our app.

## url/auth/signup (POST)
This route will be used to create a user for our application
The body of the request should look like the following
```javascript
{
  firstName : "Test",
  lastName : "User",
  email : "testUser@fake.com",
  password : "myP@$$w0rd123",
  industry : "Software Engineering"
}
```
When we send this request to our API, we get a response of 
```javascript
{
  newUser : {
    firstName : "Test",
    lastName : "User",
    email : "testUser@fake.com",
    password : "myP@$$w0rd123",
    industry : "Software Engineering"
  },
  token : "UNIQUE JWT"
}
```
## url/auth/login (POST)
This route will be used when our user is attempting to login to our app. 
The body of the request should look like the following
```javascript
{
  email : "testUser@fake.com", // the email of the account the user is trying to sign into
  password : "myP@$$w0rd123", // the password that should be associated with that account
}
```

When we send this request to our API, we get a response of 
```javascript
{
  userInfo : {
    firstName : "Test",
    lastName : "User",
    email : "testUser@fake.com",
    password : "myP@$$w0rd123",
    industry : "Software Engineering"
  },
  token : "UNIQUE JWT"
}
```

## url/applications/create (POST)
This route will be used when users want to create cards via manual entry. 
The body of the request should look like the following
```javascript
{
  userId : 3, // the ID of the user that is creating the card
  status : 2, // the status of the application
  title : "UX Designer", // the title of the position
  company : "Figma",
  location : "San Diego, CA",
  date : "Mon Aug 15 17:28:59 2022 UTC", //unix timestamp
  notes : "recruiter really likes pancakes", // can be empty
  contact : "recruiter@figma.com", // email of the recruiter for the job posting
  notif : false, // boolean indicating whether or not the user wants notifications for this application
  color : "#ff0000" // Hex Triplet Color Code for the accent of the card
}
```
When we send this request to our API, we get the same response as the body of the request but with an `app_id` which confirms that our card was successfully created.

## url/applications/auto (POST) (currently down due to Heroku issues) 
This route will be used when users want to create cards by pasting a valid LinkedIn link. 
The body of the request should have the following structure
```javascript
{
  userId : 3, // the ID of the user that is creating the card
  url : "https://www.linkedin.com/jobs/view/3025405680/" // link HAS to be in this format
  status : 2, // the status of the application
  date : "Mon Aug 15 17:28:59 2022 UTC", //unix timestamp
  contact : "recruiter@figma.com", // email of the recruiter for the job posting
  notif : false, // boolean indicating whether or not the user wants notifications for this application
  color : "#ff0000" // Hex Triplet Color Code for the accent of the card
}
```

## url/applications/users/:id (GET)

This route will be used to retrieve all cards that a specific user created. As an example `url/applications/users/1` will retrieve all cards that the user with the id of 1 created. This route does __not__ require a body to be passed.

## url/applications/:id (GET)

This route will be used to retieve all the information associated with a __specific__ application. As an example `url/applications/1` will retrieve all the information for a card with the app_id of 1. This route does __not__ require a body to be passed.

## url/applications/:id (DELETE)

This route will be used when a user wants to delete a card from the dashboard. As an example `url/applications/1` will delete the the application with an app_id of 1 from our database. This route does __not__ require a body to be passed.

## url/applications/edit/:applicationId/:column (PATCH)

This route will be used when a user wants to edit a speciifc field for a card. As an example `url/applications/1/company` will edit the _company_ field for the application with _id_ of 1 to be "New York Times". The body of the request should have the following structure

```javascript
{
  value : "New York Times"
}
```
Valid columns can be 
- Status
- position
- company
- location
- recruiter_email
- notes
- reminders_on
- card_color_hex
