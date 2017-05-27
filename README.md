# node-jwt-facebook-login-seed

A simple seed for a node express server using facebook's-oauth authentication. Utilizes mongoDB for data persistance.

## Installation

1. git clone 
2. npm install
3. node ./src

Requires a running instance of mongoDB. The mongoDB settings can be changed in under "./src/config/db.config.js".

## Usage

The endpoint POST /authenticateByFbToken takes facebook oauth access token in the request body field "fbToken". Creates a new user object if the fb-id is not been reqistered before, then returns a valid jwt access token.

The endpoint POST /verifyAccessToken can be used to validate the jwt access token by supplying the token in the header field "Authorization".

The endpoint GET /users returns a list of users. 
