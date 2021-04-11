instruction to use this app.

You have to start the front end, the backend and a keycloak server

#start front-end
npm start

#start backend
node back/server.js

#start keycloak server
use docker or any other means to run a keycloak server on localhost on port 8080
create a realm called 'keycloak-demo'
in this realm create a client called 'react-test-app', 
add 'http://localhost:3000/' to the fields 'root URL', 'admin URL' and 'web origins'
and add 'http://localhost:3000/*' to the field 'valid redirect URLs'
create a user with the username and password you want

now you can use our app :)


# test of cypress

install cypress : npm install cypress

Two test files: index.spec.js and secure.spec.js in the directory /cypress/integration/

run the test of cypress: npx cypress open

note: in the test of login, we use the user created in keycloak, so you can change the test by your user information.
