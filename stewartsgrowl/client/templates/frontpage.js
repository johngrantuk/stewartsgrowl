Template.frontpage.helpers({
  allBeers: function() {
    return AllBeers.find();
  }
});

Template.frontpage.events({
  'submit form': function(e) {
    e.preventDefault();

    mobileNo = Phoneformat.formatE164('GB', $(e.target).find('[name=mobileNo]').val());

    console.log(mobileNo)

    var newEntry = {
      //mobileNo: $(e.target).find('[name=mobileNo]').val(),
      mobileNo: mobileNo,
    };

    Meteor.call('mobileNoInsert', newEntry, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);

      if (result.mobileNoExists){
        sAlert.success('You are added and will receive a message with Stewart Brewing Beer Alerts!', {position: 'top', timeout: 'none', onRouteClose: false, stack: false});
        console.log("Mobile addded.");
      }

      if (result.mobileNoAdded){
        message = "Hi, thanks for signing up to the Stewart Brewing Beer Alert. Currently on at the Growl Station:\n" + BeerMessage() + "Text GROWLED OUT to +447481347044 to unsubscribe.";
        Meteor.call('TwilioSend', newEntry.mobileNo, message);
        sAlert.success('You are added and will receive a message with Stewart Brewing Beer Alerts!', {position: 'top', timeout: 'none', onRouteClose: false, stack: false});
      }
    });
  }
});
