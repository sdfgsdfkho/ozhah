// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json({type: 'application/json'}));

function tOut(millis){
  setTimeout(function () {
    console.log('boo')
  }, 100)
  var end = Date.now() + millis;
  while (Date.now() < end) ;
}

function confirm_area_to_work_on(req, assistant) {
  let text_to_speech = '<speak>'
 + 'Alright, repeat "L" a bunch of times. Pay attention to your tongue.'
 + '<break time="4"/>'
 + 'Did that work out for you?'
 + '</speak>'
 assistant.ask(text_to_speech);
}

function confirm_repitition(req, assistant) {
  let text_to_speech = '<speak>'
 + 'Okay, say it a bunch of times.'
 + '<break time="4"/>'
 + 'Cool. Want to move on?'
 + '</speak>'
 assistant.ask(text_to_speech);
}

function begin_activity(req, assistant) {
    let text_to_speech = '<speak>'
   + 'Great. Let\'s move on to words. Try saying the word light and make sure you pay attention to that tongue position. Really sound out every letter, be dramatic with each sound if you want to. Land that "T"!'
   + '<break time="4"/>'
   + 'Feel good about that one?'
   + '</speak>'
   assistant.tell(text_to_speech);
}

function word_activity(req, assistant) {
  let text_to_speech = '<speak>'
  + 'Great. Now say the word "Lilac". Take your time. Think about touching your tongue to the spot behind your teeth.'
  + '<break time="4"/>'
  + 'All good?'
  + '</speak>'
  assistant.ask(text_to_speech);
}

function word_repetition(req, assistant) {
  let text_to_speech = '<speak>'
  + 'Great. Repeat that a few times.'
  + '<break time="4"/>'
  + 'All good?'
  + '</speak>'
  assistant.ask(text_to_speech);
}

function phrase_activity(req, assistant) {
  let text_to_speech = '<speak>'
  + 'Cool. Let\'s try a phrase. Say,  "lovely little ladies."'
  + '<break time="4"/>'
  + 'All good?'
  + '</speak>'
  assistant.ask(text_to_speech);
}

function phrase_repetition(req, assistant) {
  let text_to_speech = '<speak>'
  + 'Great. Go ahead and practice that a bunch of times in a row. Start speeding up. See how fast you can go.'
  + '<break time="4"/>'
  + 'Do you want to move on?'
  + '</speak>'
  assistant.ask(text_to_speech);
}

function problem_area(req, assistant) {
  let text_to_speech = '<speak>'
  + 'Awesome. So let\'s start by doing some motor exercises. I got a little secret for you- the l sound is all about your tongue. So, first, put your tongue right where your teeth meets the roof of your mouth. Pay close attention to that feeling and say the letter L. Don\'t be afraid to take your time. I\'m not going anywhere.'
  + '<break time="4"/>'
  + 'Did that work out for you?'
  + '</speak>'
  assistant.ask(text_to_speech);
}

// [START YourAction]
app.post('/', function (req, res) {
  const assistant = new Assistant({request: req, response: res});
  // console.log('Request headers: ' + JSON.stringify(req.headers));
  // console.log('Request body: ' + JSON.stringify(req.body));

  // Fulfill action business logic
  function responseHandler (assistant) {
    // Complete your fulfillment logic and send a response
    var intent = req.body.result.metadata.intentName;
    console.log(intent);
    switch (intent) {
      case 'confirm_area_to_work_on':
        confirm_area_to_work_on(req.body, assistant);
        break;
      case 'confirm_repitition':
        confirm_repitition(req.body, assistant);
        break;
      case 'begin_activity':
        begin_activity(req.body, assistant);
        break;
      case 'word_activity':
        word_activity(req.body, assistant);
        break;
      case 'word_repetition':
        word_repetition(req.body, assistant);
        break;
      case 'phrase_activity':
        phrase_activity(req.body, assistant);
        break;
      case 'phrase_repetition':
        phrase_repetition(req.body, assistant);
        break;
      case 'problem_area':
        problem_area(req.body, assistant);
        break;
    }
  }
  assistant.handleRequest(responseHandler);
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
