

'use strict';

process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json({type: 'application/json'}));

const WELCOME = 'input.welcome';

app.post('/', function (req, res) {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  // Welcome
  function welcome (app) {
    app.ask(app.buildRichResponse()
      .addSimpleResponse({speech: 'Hi there!', displayText: 'Hello there!'})
      .addSimpleResponse({
        speech: 'I can show you basic cards, lists and carousels as well as ' +
          'suggestions on your phone',
        displayText: 'I can show you basic cards, lists and carousels as ' +
          'well as suggestions'})
      .addSuggestions(
        ['Basic Card', 'List', 'Carousel', 'Suggestions']));
  }

  const actionMap = new Map();
  actionMap.set(WELCOME, welcome);
  
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