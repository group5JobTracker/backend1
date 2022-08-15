# Dragonfly Backend API

This is the internal API that we will be using to do CRUD operations on our app. There are currently two main routes that we will be using to support the main dashboard view. One is url/auth, which will be used to allow customers to be able to login and sign up. The other is url/applications, which will house all the routes to do CRUD operations for our app.

## url/auth/signup
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
## url/auth/login
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

# Moving onto url/applications




