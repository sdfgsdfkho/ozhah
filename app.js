

'use strict';

process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json({type: 'application/json'}));


const NORMAL_ASK = 'normal.ask';
const NORMAL_BYE = 'normal.bye';
const BYE_RESPONSE = 'bye.response';
const BYE_CARD = 'bye.card';
const WELCOME = 'input.welcome';
const BASIC_CARD = 'basic.card';
const LIST = 'list';
const CAROUSEL = 'carousel';
const SUGGESTIONS = 'suggestions';
const ITEM_SELECTED = 'item.selected';
const CARD_BUILDER = 'card.builder';

// Constants for list and carousel selection
const SELECTION_KEY_ONE = 'title';
const SELECTION_KEY_GOOGLE_HOME = 'googleHome';
const SELECTION_KEY_GOOGLE_PIXEL = 'googlePixel';
const SELECTION_KEY_GOOGLE_ALLO = 'googleAllo';

// Constant for image URLs
const IMG_URL_AOG = 'https://developers.google.com/actions/images/badges' +
  '/XPM_BADGING_GoogleAssistant_VER.png';
const IMG_URL_GOOGLE_HOME = 'https://lh3.googleusercontent.com' +
  '/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw';
const IMG_URL_GOOGLE_PIXEL = 'https://storage.googleapis.com/madebygoog/v1' +
  '/Pixel/Pixel_ColorPicker/Pixel_Device_Angled_Black-720w.png';
const IMG_URL_GOOGLE_ALLO = 'https://allo.google.com/images/allo-logo.png';

exports.conversationComponent = functions.https.onRequest((req, res) => {
  const app = new ApiAiApp({request: req, response: res});
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

  function normalAsk (app) {
    app.ask('Ask me to show you a list, carousel, or basic card');
  }

   // Suggestions
  function suggestions (app) {
    app.ask(app
      .buildRichResponse()
      .addSimpleResponse('This is a simple response for suggestions')
      .addSuggestions('Suggestion Chips')
      .addSuggestions(['Basic Card', 'List', 'Carousel'])
      .addSuggestionLink('Suggestion Link', 'https://assistant.google.com/'));
  }

  // Basic card
  function basicCard (app) {
    app.ask(app.buildRichResponse()
      .addSimpleResponse('This is the first simple response for a basic card')
      .addSuggestions(
        ['Basic Card', 'List', 'Carousel', 'Suggestions'])
        // Create a basic card and add it to the rich response
      .addBasicCard(app.buildBasicCard(`This is a basic card.  Text in a
      basic card can include "quotes" and most other unicode characters 
      including emoji 📱.  Basic cards also support some markdown 
      formatting like *emphasis* or _italics_, **strong** or __bold__, 
      and ***bold itallic*** or ___strong emphasis___ as well as other things
      like line  \nbreaks`) // Note the two spaces before '\n' required for a
                            // line break to be rendered in the card
        .setSubtitle('This is a subtitle')
        .setTitle('Title: this is a title')
        .addButton('This is a button', 'https://assistant.google.com/')
        .setImage(IMG_URL_AOG, 'Image alternate text'))
      .addSimpleResponse({ speech: 'This is the 2nd simple response ',
        displayText: 'This is the 2nd simple response' })
    );
  }

  // List
  function list (app) {
    app.askWithList(app.buildRichResponse()
      .addSimpleResponse('This is a simple response for a list')
      .addSuggestions(
        ['Basic Card', 'List', 'Carousel', 'Suggestions']),
      // Build a list
      app.buildList('List Title')
        // Add the first item to the list
        .addItems(app.buildOptionItem(SELECTION_KEY_ONE,
          ['synonym of title 1', 'synonym of title 2', 'synonym of title 3'])
          .setTitle('Title of First List Item')
          .setDescription('This is a description of a list item')
          .setImage(IMG_URL_AOG, 'Image alternate text'))
        // Add the second item to the list
        .addItems(app.buildOptionItem(SELECTION_KEY_GOOGLE_HOME,
          ['Google Home Assistant', 'Assistant on the Google Home'])
          .setTitle('Google Home')
          .setDescription('Google Home is a voice-activated speaker powered ' +
            'by the Google Assistant.')
          .setImage(IMG_URL_GOOGLE_HOME, 'Google Home')
        )
        // Add third item to the list
        .addItems(app.buildOptionItem(SELECTION_KEY_GOOGLE_PIXEL,
          ['Google Pixel XL', 'Pixel', 'Pixel XL'])
          .setTitle('Google Pixel')
          .setDescription('Pixel. Phone by Google.')
          .setImage(IMG_URL_GOOGLE_PIXEL, 'Google Pixel')
        )
        // Add last item of the list
        .addItems(app.buildOptionItem(SELECTION_KEY_GOOGLE_ALLO, [])
          .setTitle('Google Allo')
          .setDescription('Introducing Google Allo, a smart messaging app ' +
            'that helps you say more and do more.')
          .setImage(IMG_URL_GOOGLE_ALLO, 'Google Allo Logo')
          .addSynonyms('Allo')
        )
    );
  }

  // Carousel
  function carousel (app) {
    app.askWithCarousel(app.buildRichResponse()
      .addSimpleResponse('This is a simple response for a carousel')
      .addSuggestions(
        ['Basic Card', 'List', 'Carousel', 'Suggestions']),
      app.buildCarousel()
        // Add the first item to the carousel
        .addItems(app.buildOptionItem(SELECTION_KEY_ONE,
          ['synonym of title 1', 'synonym of title 2', 'synonym of title 3'])
          .setTitle('Title of First List Item')
          .setDescription('This is a description of a carousel item')
          .setImage(IMG_URL_AOG, 'Image alternate text'))
        // Add the second item to the carousel
        .addItems(app.buildOptionItem(SELECTION_KEY_GOOGLE_HOME,
          ['Google Home Assistant', 'Assistant on the Google Home'])
          .setTitle('Google Home')
          .setDescription('Google Home is a voice-activated speaker powered ' +
            'by the Google Assistant.')
          .setImage(IMG_URL_GOOGLE_HOME, 'Google Home')
        )
        // Add third item to the carousel
        .addItems(app.buildOptionItem(SELECTION_KEY_GOOGLE_PIXEL,
          ['Google Pixel XL', 'Pixel', 'Pixel XL'])
          .setTitle('Google Pixel')
          .setDescription('Pixel. Phone by Google.')
          .setImage(IMG_URL_GOOGLE_PIXEL, 'Google Pixel')
        )
        // Add last item of the carousel
        .addItems(app.buildOptionItem(SELECTION_KEY_GOOGLE_ALLO, [])
          .setTitle('Google Allo')
          .setDescription('Introducing Google Allo, a smart messaging app ' +
            'that helps you say more and do more.')
          .setImage(IMG_URL_GOOGLE_ALLO, 'Google Allo Logo')
          .addSynonyms('Allo')
        )
    );
  }

  // React to list or carousel selection
  function itemSelected (app) {
    const param = app.getSelectedOption();
    console.log('USER SELECTED: ' + param);
    if (!param) {
      app.ask('You did not select any item from the list or carousel');
    } else if (param === SELECTION_KEY_ONE) {
      app.ask('You selected the first item in the list or carousel');
    } else if (param === SELECTION_KEY_GOOGLE_HOME) {
      app.ask('You selected the Google Home!');
    } else if (param === SELECTION_KEY_GOOGLE_PIXEL) {
      app.ask('You selected the Google Pixel!');
    } else if (param === SELECTION_KEY_GOOGLE_ALLO) {
      app.ask('You selected Google Allo!');
    } else {
      app.ask('You selected an unknown item from the list or carousel');
    }
  }

  // Recive a rich response from API.AI and modify it
  function cardBuilder (app) {
    app.ask(app.getIncomingRichResponse()
      .addBasicCard(app.buildBasicCard(`Actions on Google let you build for
       the Google Assistant. Reach users right when they need you. Users don’t
       need to pre-enable skills or install new apps.  \n  \nThis was written 
       in the fulfillment webhook!`)
        .setSubtitle('Engage users through the Google Assistant')
        .setTitle('Actions on Google')
        .addButton('Developer Site', 'https://developers.google.com/actions/')
        .setImage('https://lh3.googleusercontent.com/Z7LtU6hhrhA-5iiO1foAfGB' +
          '75OsO2O7phVesY81gH0rgQFI79sjx9aRmraUnyDUF_p5_bnBdWcXaRxVm2D1Rub92' +
          'L6uxdLBl=s1376', 'Actions on Google')));
  }

  // Leave conversation with card
  function byeCard (app) {
    app.tell(app.buildRichResponse()
      .addSimpleResponse('Goodbye, World!')
      .addBasicCard(app.buildBasicCard('This is a goodbye card.')));
  }

  // Leave conversation with SimpleResponse
  function byeResponse (app) {
    app.tell({speech: 'Okay see you later',
      displayText: 'OK see you later!'});
  }

  // Leave conversation
  function normalBye (app) {
    app.tell('Okay see you later!');
  }

  const actionMap = new Map();
  actionMap.set(WELCOME, welcome);
  actionMap.set(NORMAL_ASK, normalAsk);
  actionMap.set(BASIC_CARD, basicCard);
  actionMap.set(LIST, list);
  actionMap.set(ITEM_SELECTED, itemSelected);
  actionMap.set(CAROUSEL, carousel);
  actionMap.set(SUGGESTIONS, suggestions);
  actionMap.set(BYE_CARD, byeCard);
  actionMap.set(NORMAL_BYE, normalBye);
  actionMap.set(BYE_RESPONSE, byeResponse);
  actionMap.set(CARD_BUILDER, cardBuilder);

  app.handleRequest(actionMap);
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