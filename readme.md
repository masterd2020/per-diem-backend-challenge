# Per Diem Backend Challenge

## Development setup
Clone this repository and run `npm install` to install all the packages

Start the server by running `npm run dev`

## Test
You must have jest installed to run the test

## Authentication and Authorization
Three levels of users is implemented i.e (admin, merchant, customer), and there are 3 user already created for testing the authentication and authorization part. Although another users can be created for testing also.

### Admin user 
Email: admin@perdiem.co
password: pass1234

### Merchant user 
Email: merchant@perdiem.co
password: pass1234

### Customer user 
Email: customer@perdiem.co
password: pass1234

## Reason why i choose JWT for my authentication
Jsonwebtoken(jwt) is one of the most popular, widely used for authentication and authorization with nodejs.
What's make it so sine is that when we issue a jwt for a  logged in user, all subsequent request will contain the jwt along with them. And with this it's makes it more use in building Restful API for authentication and authorisation because it allows one of the guiding principles for building Restful API which is been STATELESS i.e all the request from client to server and server to client will contain all the necessary information to understand that request.