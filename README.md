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

##keycloak test

we use mock and nightwatch to test record bank card information without login by keycloak.

###install toolbox

- install mockjs: 
  ```
  npm install mockjs
  ```
- download and install JDK (7+)
- download [WebDriver for Google Chrome](https://sites.google.com/a/chromium.org/chromedriver/downloads) and copy to "test" folder.(selenium-server-standalone-3.0.0.jar)
- install Nightwatch:
  ```
  npm install -g nightwatch

###run test
- open two terminals
- in the first terminal, run Selenium: 
  ```
  java -jar selenium-server-standalone-3.0.0.jar
- in the second terminal, run: 
  ```
  nightwatch test/nightwatch-test.js
  ```
