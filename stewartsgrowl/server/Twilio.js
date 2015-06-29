Meteor.methods({
  TwilioSendOld: function(Number, Message) {

    console.log("Sending");

    twilio = Twilio('ACd083d5372108bb0cf5780e79b965a44d', '12fc0193ccd1811c359a5d6fff19c0d0');
    twilio.sendSms({
      to: Number,
      from: '+441315102335',
      body: Message
    }, function(err, responseData) { //this function is executed when a response is received from Twilio

      if (!err) { // "err" is an error received during the request, if any
        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1
        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."
      }
      else{
        console.log(err);
      }
    });

  }

});

Meteor.methods({
  TwilioSend: function(Number, Message) {

    console.log("Sending");

    var accountSid = 'ACd083d5372108bb0cf5780e79b965a44d';
    var authToken = '12fc0193ccd1811c359a5d6fff19c0d0';

    var twilio = Npm.require('twilio');
    var client = new twilio.RestClient(accountSid, authToken);
    //var client = Npm.require('twilio')(accountSid, authToken);
    //twilio = Twilio('ACd083d5372108bb0cf5780e79b965a44d', '12fc0193ccd1811c359a5d6fff19c0d0');

    client.messages.create({
        body: Message,
        to: Number,
        from: '+441315102335'//,
        //mediaUrl: "http://www.example.com/hearts.png"
    }, function(err, message) {

      if (!err) { // "err" is an error received during the request, if any
        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1
        console.log(message.from); // outputs "+14506667788"
        console.log(message.body); // outputs "word to your mother."
      }
      else{
        console.log(err);
      }
    });

  }

});
