Template.admin.helpers({
  beers: function(){
    return AllBeers.find();
  }
})

Template.admin.events({
  "click #sendBtn": function(event, template){
     console.log("SEND");

     Meteor.call('TwilioSend', "TEST", function(error, result) {
       // display the error to the user and abort
       if (error){
         console.log("Failed")
         return;
       }

        console.log("OK")

     });


  }
});
