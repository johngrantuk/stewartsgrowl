Meteor.methods({
  TwilioSendToAll: function(Message) {

    console.log("TwilioSendToAll():");
    console.log("Size: " + Message.length);
    console.log("Message: " + Message);

    var accountSid = Meteor.settings.twilioAccountSid;
    var authToken = Meteor.settings.twilioAuthToken;

    var twilio = Meteor.npmRequire('twilio');
    var client = new twilio.RestClient(accountSid, authToken);                  // Set up the Twilio Node library.

    var allMobileNos = MobileNos.find();                                        // Find all registered numbers.

    var reportMsg = new Date() + " TwilioSendToAll():\n" + Message + "\n";

    allMobileNos.forEach(function (mobileNo) {                                  // Send message to each.

        reportMsg = reportMsg + "\nSending to: " + mobileNo.mobileNo + "\n";

        console.log("\nSending to: " + mobileNo.mobileNo);

        Async.runSync(function(done) {        // Pauses execution until done() is called.

           client.messages.create({
             body: Message,
             to: mobileNo.mobileNo,
             from: Meteor.settings.twilioNumber
           }, function(err, message) {

             if (!err) { // "err" is an error received during the request, if any
              console.log(message);
              reportMsg = reportMsg + "Message sent to: " + message.to + "\nStatus: " + message.status + "\nSegments: " + message.num_segments + "\nPrice: " + message.price_unit + message.price + "\nError: " + message.error_message + "\n";
             }
             else{
               reportMsg = reportMsg + "Error sending message:\n" + err.message + "\n";
               console.log("Error sending message:");
               console.log(err);
             }

             done(null, "OK");                   // Execution moves on.
           });
         });

     });


    SendEmail(reportMsg);
    console.log("Exiting TwilioSendAll().");
  }

});

Meteor.methods({
  TwilioSend: function(MobileNo, Message) {

    console.log("TwilioSend():");
    console.log("Sending to: " + MobileNo);
    console.log("Size: " + Message.length);
    console.log("Message: " + Message);

    var accountSid = Meteor.settings.twilioAccountSid;
    var authToken = Meteor.settings.twilioAuthToken;

    var twilio = Meteor.npmRequire('twilio');
    var client = new twilio.RestClient(accountSid, authToken);                  // Set up the Twilio Node library.

    var reportMsg = new Date() + " TwilioSend():\n" + Message + "\n";

    reportMsg = reportMsg + "\nSending to: " + MobileNo + "\n";


    Async.runSync(function(done) {        // Pauses execution until done() is called.

       client.messages.create({
         body: Message,
         to: MobileNo,
         from: Meteor.settings.twilioNumber
       }, function(err, message) {

         if (!err) { // "err" is an error received during the request, if any
          console.log(message);
          reportMsg = reportMsg + "Message sent to: " + message.to + "\nStatus: " + message.status + "\nSegments: " + message.num_segments + "\nPrice: " + message.price_unit + message.price + "\nError: " + message.error_message + "\n";
         }
         else{
           reportMsg = reportMsg + "Error sending message:\n" + err.message + "\n";
           console.log("Error sending message:");
           console.log(err);
         }

         done(null, "OK");                   // Execution moves on.
       });
     });

    SendEmail(reportMsg);
    console.log("Exiting TwilioSend().");
  }

});

Meteor.methods({
  mobileNoInsert: function(mobileNoAttributes) {

    check(mobileNoAttributes, {
      mobileNo: String
    });

    var postWithSameNo = MobileNos.findOne({mobileNo: mobileNoAttributes.mobileNo});
    if (postWithSameNo) {
      return {
        mobileNoExists: true
      }
    }

    var newMobileNo = _.extend(mobileNoAttributes, {
      submitted: new Date()
    });

    MobileNos.insert(newMobileNo);

    SendEmail("Added a number: " + newMobileNo.mobileNo + " " + newMobileNo.submitted);

    return {
      mobileNoAdded: true
    }
  }
});

var SendEmail = function (Message) {

  Email.send({
      to: Meteor.settings.adminEmail,
      from: Meteor.settings.adminEmail,
      subject: "SG Message",
      text: Message
    });
}
