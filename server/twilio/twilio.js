var accountSid = 'AC6449e7510867d3a5c658ea2b39f24227'; // Your Account SID from www.twilio.com/console
var authToken = '451bd935048fede9a44b505c60e25e21';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Your appointment is in ' + 'days go here',
    to: '+15512643547',  // Text this number
    from: '+19564773577' // From a valid Twilio number
})
.then((message) => console.log('then after twilio ',message.sid));