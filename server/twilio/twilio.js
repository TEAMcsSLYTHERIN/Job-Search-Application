const accountSid = 'AC6449e7510867d3a5c658ea2b39f24227'; // Your Account SID from www.twilio.com/console
const authToken = '451bd935048fede9a44b505c60e25e21';   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

const userPhone = '+12018776459';
const goalTotal = 130;
let currentTotal = 67;
let dailyGoal = 3;
let followUps = 5;
let followUpsTotal = 23;
let events = 2;
let eventsTotal = 12;

// client.messages.create({
//     body: 'Your appointment is in ' + 'days go here',
//     to: '+15512643547',  // Text this number
//     from: '+19564773577' // From a valid Twilio number
// })
// .then((message) => console.log('then after twilio ',message.sid))

module.exports = {
// User has already set a daily, weekly, or monthly application goal
    dailyMorningUpdate: function(userPhone, goalTotal, currentTotal, dailyGoal, followUps, events) {
      const applicationAmount = (goalTotal - (currentTotal + dailyGoal))
      const followUpsCount = followUps.length;
      const eventCount = events.length;
      const bodyText = `You have ${applicationAmount} follow-ups to send today to stay on track with your goals. You have ${followUpsCount} follow-ups to send today. You have ${eventCount} interviews/meetings to attend today.`;

      client.messages.create({
        body: bodyText,
        to: userPhone,
        from: '+19564773577'
      })
      .then((message) => console.log('then after twilio ', message.sid));
    },

    dailyEveningUpdate: function(userPhone, goalTotal, currentTotal) {
      const newAverage = (goalTotal - currentTotal)/(Math.floor(/* 5 - current # of business day */))
      const bodyText = `You completed ${currentTotal} applications so far this week, great work! At this rate, you have to complete ${newAverage} applications per day to achieve your goal of ${goalTotal}. See you tomorrow!`;

      client.messages.create({
        body: bodyText,
        to: userPhone,
        from: '+19564773577'
      })
      .then((message) => console.log('then after twilio ', message.sid));
    },

    weeklyUpdate: function(userPhone, goalTotal, currentTotal, followUpsTotal, eventsTotal) {
      const bodyText = `IT'S THE END OF THE WEEK WOOO!!! You completed ${currentTotal} applications this week, leaving your remaining goal's total at ${goalTotal}. You completed ${followUpsTotal} follow-ups and crushed ${eventsTotal} interviews/meetings this week. Give yourself a break, you deserved it. See you next week!`;

      client.messages.create({
        body: bodyText,
        to: userPhone,
        from: '+19564773577'
      })
      .then((message) => console.log('then after twilio ', message.sid));
    },

    // followUpNotification: function(jobId, jobStatus, ) {
    //   set a SMS notification for a specific job, with the specified amount of time
    // }
}