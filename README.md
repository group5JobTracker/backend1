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
