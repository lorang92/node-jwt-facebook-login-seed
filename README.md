# node-jwt-facebook-login-seed

A simple node express server, mongoDB backend, using facebook-oauth authentication. Creates a user-object if the fbId obtained from the oauth access token does not reside in the db, containing the fbId and the name associated with the users facebook profile. A jwt access token is signed and returned upon sucessfull authentication to serve as further authentication.

## Installation

1. git clone 
2. npm install
3. node src

Requires a running instance of mongoDB. The mongoDB settings can be changed in under "./src/config/db.config.js".

## Usage

The endpoint POST /authenticateByFbToken takes facebook oauth access token in the request body field "fbToken". Creates a new user object if the fb-id is not been reqistered before, and returns a valid jwt access token.

The endpoint POST /verifyAccessToken takes a jwt access token in the header field "Authorization". Returns 200 if the supplied token is valid, returns 401 otherwise.
