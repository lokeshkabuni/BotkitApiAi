
var apiai = require('botkit-middleware-apiai')({
    token: '852d7df91bd447659152c7f460d9700a',
    skip_bot: true // or false. If true, the middleware don't send the bot reply/says to api.ai
});

var Botkit = require('./botkit/lib/botkit');

var controller = Botkit.slackbot({
  debug: false
});

controller.spawn({
  token: 'xoxb-200158612023-ygcpCfbq2EDfV0ztP2727yBl',
}).startRTM()

controller.middleware.receive.use(apiai.receive);

controller.hears('i want to print three vase on monday',['direct_message','direct_mention','mention'],function(bot,message) {

  bot.reply(message,'yeah sure');
  console.log(message.nlpResponse);
});

controller.hears('Hello',['direct_message','direct_mention','mention'],function(bot,message) {

  bot.reply(message,'Hello, How can i help you ?');
  console.log(JSON.stringify(message));
});

// controller.hears('print',['direct_message','direct_mention','mention'], function(bot, message) {
//     bot.reply(message, 'I heard... something!');
//     console.log(message.nlpResponse);
// });

controller.hears('.*',['direct_message','direct_mention','mention'], function(bot, message) {
    bot.reply(message, message.fulfillment.speech);
    console.log(message.nlpResponse);
});