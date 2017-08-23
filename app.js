

'use strict';

process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json({type: 'application/json'}));


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

function normalAsk (app) {
  app.ask('Ask me to show you a list, carousel, or basic card');
}