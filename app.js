

'use strict';

process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json({type: 'application/json'}));

app.post('/', function (req, res) {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  const WELCOME_INTENT = 'input.welcome';
  const NUMBER_INTENT = 'input.number';
  
  function welcomeIntent (assistant) {
    assistant.ask('Welcome to action snippets! Say a number.',
      ['Say any number', 'Pick a number', 'We can stop here. See you soon.']);
  }
  
  function numberIntent (assistant) {
    const number = assistant.getArgument(NUMBER_ARGUMENT);
    assistant.tell('You said ' + number);
  }
  
  const actionMap = new Map();
  actionMap.set(WELCOME_INTENT, welcomeIntent);
  actionMap.set(NUMBER_INTENT, numberIntent);
  assistant.handleRequest(actionMap);
});
if (module === require.main) {
  // [START server]
  // Start the server
  let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log('App listening on port %s', port);
  });
  // [END server]
}

module.exports = app;
